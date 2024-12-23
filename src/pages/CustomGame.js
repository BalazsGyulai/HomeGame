import React, { useContext, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import NavManage from "../side/NavContext";
import PlayerCustom from "../components/PlayerCustom";
import { motion } from "framer-motion";
const CustomGame = () => {
  const { game } = useParams();
  const {
    column,
    customScores,
    UpgradeCustomScores,
    upgradeActGameName,
    UpdateCustomScoresValue
  } = useContext(NavManage);
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  const variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  useEffect(() => {
    UpgradeCustomScores(game);
    upgradeActGameName(game);
  }, [game]);

  const dragStart = (e, position) => {
    dragItem.current = position;
  };

  const dragEnter = (e, position) => {
    dragOverItem.current = position;
  };

  const drop = () => {
    let copyItems = [...customScores];
    const temp = copyItems[dragOverItem.current];
    copyItems[dragOverItem.current] = copyItems[dragItem.current];
    copyItems[dragItem.current] = temp;

    UpdateCustomScoresValue(copyItems);
  };

  return (
    <>
      <motion.div
        variants={variants}
        initial="hidden"
        animate="visible"
        className="game"
        style={{
          gridTemplateColumns: `repeat(auto-fit, calc(100% / ${column}))`
        }}
      >
        {customScores.map((score, index) =>
          score.visible ? (
            <motion.div key={index} variants={item}>
              <PlayerCustom
                score={score}
                key={index}
                del={0}
                gameName={game}
                onDragStart={(e) => dragStart(e, index)}
                onDragEnter={(e) => dragEnter(e, index)}
                onDragEnd={drop}
              />
            </motion.div>
          ) : (
            ""
          )
        )}
      </motion.div>
    </>
  );
};

export default CustomGame;
