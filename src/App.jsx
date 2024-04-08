import React, { useContext, useEffect, useState } from "react";
import Footer from "./components/Footer";
import Content from "./components/Content";
import Header from "./components/Header";
import Banner from "./components/Banner";
import { produits, accueil } from "./data/data";
import styles from "./assets/styles/App.module.scss";
import ProduitFavorisContext from "./contexts/produitFavorisContext";

const App = () => {
  const [produitsFavoris, setProduitsFavoris] = useState([]);
  // Si l'item est dans la liste on l'enlève
  // Sinon on l'ajoute
  const handleAjusterProduitFavoris = (item) => {
    let result = produitsFavoris.filter((t) => t._id === item._id);
    if (result.length > 0)
      setProduitsFavoris(produitsFavoris.filter((t) => t._id !== item._id));
    else setProduitsFavoris([...produitsFavoris, item]);
  };

  useEffect(() => {
    async function getMessage() {
      const response = await fetch("http://localhost:5000/");
      // console.log(response);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
      }
    }
    getMessage();
  }, []);

  return (
    <div className={`${styles.app_container} d-flex flex-column`}>
      <ProduitFavorisContext.Provider
        value={{ data: produitsFavoris, setData: handleAjusterProduitFavoris }}
      >
        <Header setProduitsFavoris={setProduitsFavoris} />
        <Banner />
        <Content produits={produits} accueil={accueil} />
      </ProduitFavorisContext.Provider>
      <Footer />
    </div>
  );
};

export default App;
