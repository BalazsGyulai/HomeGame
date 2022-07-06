import React, { useEffect, useState } from 'react'
import axios from 'axios'

const ListOfPoints = ({game, id}) => {
    const [scores, setScores] = useState([]);

    useEffect(() => {

        axios.get(`http://localhost/players.php/?players=2&id=${id}&game=${game}`)
        .then((res) => {
            setScores(res.data);
        })
    }, [])
  return (
    <>
    {scores.map((score) => (
        <div>{score}</div>
    ))}
    </>
  )
}

export default ListOfPoints