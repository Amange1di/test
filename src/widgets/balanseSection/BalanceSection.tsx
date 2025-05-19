import React, { useState, useEffect } from "react";
import "./balanceSection.scss";
import finsh from "../../shared/mp3/finsh.mp3";
import weightSound from "../../shared/mp3/weight-sound.mp3";

import { AvailableWeights } from "./availableWeights/AvailableWeights";
import { HooksSide } from "./hooksSide/HooksSide";
import { Modal } from "../../features/modal/Modal";
import { Task } from "../../type/type";
const MOCKAPI_URL = "https://682857da6b7628c52912fd96.mockapi.io/a";

const hooksLeft = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
const hooksRight = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];



export const BalanceSection = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  const [leftWeights, setLeftWeights] = useState<(number | null)[]>(Array(10).fill(null));
  const [rightWeights, setRightWeights] = useState<(number | null)[]>(Array(10).fill(null));
  const [availableWeights, setAvailableWeights] = useState<number[]>([]);

  const [draggedWeight, setDraggedWeight] = useState<number | null>(null);
  const [dragSource, setDragSource] = useState<null | {
    side: "left" | "right" | "available";
    index: number;
  }>(null);

  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    fetch(MOCKAPI_URL)
      .then((res) => res.json())
      .then((data: Task[]) => {
        setTasks(data);
        if (data.length > 0) {
          setSelectedTaskId(data[0].id);
          setAvailableWeights(data[0].mass);
        }
      })
      .catch(() => {
        const localTasks: Task[] = [
          { id: "1", task: "task 1", mass: [12, 2, 23, 3, 4] },
          { id: "2", task: "task 2", mass: [4, 5, 66, 7, 2, 2] },
          { id: "3", task: "task 3", mass: [2, 2, 1, 1, 1, 1] },
        ];
        setTasks(localTasks);
        setSelectedTaskId(localTasks[0].id);
        setAvailableWeights(localTasks[0].mass);
      });
  }, []);

  const handleTaskChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const taskId = e.target.value;
    setSelectedTaskId(taskId);
    setLeftWeights(Array(10).fill(null));
    setRightWeights(Array(10).fill(null));
    setDraggedWeight(null);
    setDragSource(null);
    setErrorMessage(null);
    setShowModal(false);

    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      setAvailableWeights(task.mass);
    }
  };

  const playWeightSound = () => {
    const sound = new Audio(weightSound);
    sound.play();
  };

  const handleDrop = (side: "left" | "right", index: number) => {
    if (draggedWeight === null || dragSource === null) return;
    if (dragSource.side === side && dragSource.index === index) return;

    const newLeft = [...leftWeights];
    const newRight = [...rightWeights];
    const targetWeights = side === "left" ? newLeft : newRight;

    if (targetWeights[index] !== null) return;

    if (dragSource.side === "available") {
      setAvailableWeights((prev) => prev.filter((_, i) => i !== dragSource.index));
    } else if (dragSource.side === "left") {
      newLeft[dragSource.index] = null;
    } else if (dragSource.side === "right") {
      newRight[dragSource.index] = null;
    }

    if (side === "left") {
      newLeft[index] = draggedWeight;
    } else {
      newRight[index] = draggedWeight;
    }

    playWeightSound();

    setLeftWeights(newLeft);
    setRightWeights(newRight);
    setDraggedWeight(null);
    setDragSource(null);
  };

  const handleClear = () => {
    setLeftWeights(Array(10).fill(null));
    setRightWeights(Array(10).fill(null));
    const currentTask = tasks.find((t) => t.id === selectedTaskId);
    setAvailableWeights(currentTask ? currentTask.mass : []);
    setDraggedWeight(null);
    setDragSource(null);
    setErrorMessage(null);
    setShowModal(false);
  };

  const calculateTorque = (): number => {
    const leftTorque = leftWeights.reduce(
      (sum: number, weight: number | null, index: number): number => {
        if (weight !== null) {
          const distance = 10 - index;
          return sum + weight * distance;
        }
        return sum;
      },
      0
    );

    const rightTorque = rightWeights.reduce(
      (sum: number, weight: number | null, index: number): number => {
        if (weight !== null) {
          const distance = index + 1;
          return sum + weight * distance;
        }
        return sum;
      },
      0
    );

    return leftTorque - rightTorque;
  };

  const handleCheck = () => {
    const torque = calculateTorque();

    const hasAnyWeight = [...leftWeights, ...rightWeights].some((w) => w !== null);
    if (!hasAnyWeight) {
      setErrorMessage("Сначала разместите грузы!");
      return;
    }

    if (Math.abs(torque) < 0.0001) {
      setShowModal(true);
      setErrorMessage(null);
      new Audio(finsh).play();
    } else {
      setErrorMessage("Баланс неверен, попробуйте снова!");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    handleClear();
  };

  const torque = calculateTorque();
  const maxAngle = 10;
  const angle = -Math.max(Math.min(torque, 10), -10) * (maxAngle / 10);

  return (
    <div className="balanceSection">
      <div className="container">
        <div className="selectWrapper">
          <label htmlFor="taskSelect">Выберите задачу: </label>
          <select id="taskSelect" value={selectedTaskId || ""} onChange={handleTaskChange}>
            {tasks.map((task) => (
              <option key={task.id} value={task.id}>
                {task.task}
              </option>
            ))}
          </select>
        </div>

        <AvailableWeights
          availableWeights={availableWeights}
          onDragStart={(weight, index) => {
            setDraggedWeight(weight);
            setDragSource({ side: "available", index });
          }}
          onClear={handleClear}
          onCheck={handleCheck}
          errorMessage={errorMessage}
        />

        <div
          className="balanceSection_balka"
          style={{
            transform: `rotate(${angle}deg)`,
            transition: "transform 0.3s ease-in-out",
          }}
        >
          <HooksSide
            hooks={hooksLeft}
            weights={leftWeights}
            side="left"
            onDrop={handleDrop}
            onDragStart={(weight, index, side) => {
              setDraggedWeight(weight);
              setDragSource({ side, index });
            }}
          />

          <HooksSide
            hooks={hooksRight}
            weights={rightWeights}
            side="right"
            onDrop={handleDrop}
            onDragStart={(weight, index, side) => {
              setDraggedWeight(weight);
              setDragSource({ side, index });
            }}
          />
        </div>

        <div className="balanceSection_stoika">
          <div className="balanceSection_stoika_top"></div>
        </div>
      </div>

      {showModal && (
        <Modal leftWeights={leftWeights} rightWeights={rightWeights} onClose={handleCloseModal} />
      )}
    </div>
  );
};
