import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import PlantItem from '../PlantItem/PlantItem';

function PlantList() {
  const dispatch = useDispatch();
  const plantList = useSelector((store) => store.plantReducer);

  useEffect(() => {
    getPlants();
  }, []);

  const getPlants = function () {
    dispatch({
      type: 'GET_PLANTS',
    });
  }; // end getFavorites

  console.log('plantList', plantList);
  // const [plantList, setPlantList] = useState([]);

  // useEffect(() => {
  //   getPlantList();
  // }, []);

  // const getPlantList = () => {
  //   axios
  //     .get('/api/plant-details')
  //     .then((res) => {
  //       console.log('res received', res);
  //       setPlantList(res.data);
  //     })
  //     .catch((err) => {
  //       console.error('error getting request', err);
  //     });
  // };

  return (
    <ul>
      {plantList.map((plant, index) => {
        return <PlantItem key={index} plant={plant} />;
      })}
    </ul>
  );
}

export default PlantList;
