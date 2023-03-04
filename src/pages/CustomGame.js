import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavManage from "../side/NavContext";
import PlayerCustom from "../components/PlayerCustom";
import { motion } from "framer-motion";
const CustomGame = () => {
  const { game } = useParams();
  const { column, customScores, UpgradeCustomScores, upgradeActGameName } =
    useContext(NavManage);

  const variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const item={
    hidden: {y: 20, opacity: 0},
    visible: {y: 0, opacity: 1}
  }

  useEffect(() => {
    UpgradeCustomScores(game);
    upgradeActGameName(game);
  }, [game]);

  return (
    <>
      <motion.div
        variants={variants}
        initial="hidden"
        animate="visible"
        className="game"
        style={{
          gridTemplateColumns: `repeat(auto-fit, calc(100% / ${column}))`,
        }}
      >
        {customScores.map((score, index) => (
          <motion.div key={index} variants={item}>
            <PlayerCustom score={score} key={index} del={0} gameName={game} />
          </motion.div>
        ))}
      </motion.div>
    </>
  );
};

export default CustomGame;
