function PlantItem({ plant }) {
  console.log(plant);
  return (
    <li>
      {plant.ScientificName}
      {/* hi plant.primaryCommonName
      plant.speciesGlobal.kingdom */}
    </li>
  );
}

export default PlantItem;
