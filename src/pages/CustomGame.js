import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import NavManage from "../side/NavContext";
import PlayerCustom from '../components/PlayerCustom';

const CustomGame = () => {
    const { game } = useParams();
    const { column, customScores, UpgradeCustomScores, upgradeActGameName} = useContext(NavManage);

    useEffect(() => {
        UpgradeCustomScores(game);
        upgradeActGameName(game);
    }, [game]);

  return (
    <>
    <div className="game" style={{gridTemplateColumns: `repeat(auto-fit, calc(100% / ${column}))`}}>
        {customScores.map((score, index) => (
            <PlayerCustom score={score} key={index} del={0} gameName={game}/>
        ))}
      </div>
    </>
  )
}

export default CustomGame