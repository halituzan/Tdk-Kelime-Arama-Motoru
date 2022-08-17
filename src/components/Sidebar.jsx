import React, { useEffect, useState } from "react";
import "../App.css";
import { AiOutlineMenu, AiFillCloseCircle } from "react-icons/ai";
import { useCookies } from "react-cookie";
import { Card } from "react-bootstrap";
import axios from "axios";

export default function Sidebar() {
  const [cookies, setCookies] = useCookies();
  const favArr = cookies?.favorites?.split(",");
  favArr?.shift();
  const [favoriler, setFavoriler] = useState([]);
  console.log(favArr);

  const getWords = async (num) => {
    const { data } = await axios.get(`https://sozluk.gov.tr/gts_id?id=${num}`);

    setFavoriler((oldArr) => [
      ...oldArr,
      {
        madde: data[0]?.madde,
        anlamlarListe: data[0]?.anlamlarListe,
        id: data[0]?.madde_id,
      },
    ]);
  };

  console.log(favoriler);

  const newFav = (fav) => {
    getWords(fav);
  };
  useEffect(() => {
    listArr(favArr);
  }, [cookies]);

  const listArr = (arr) => {
    for (let index = 0; index < arr?.length; index++) {
      getWords(arr[index]);
    }
  };

  useEffect(() => {}, []);

  return (
    <div className="sidebar">
      <div className="s-header d-flex justify-content-evenly align-items-center pt-2">
        <h1 className="text-light text-center p-1">Favoriler</h1>
        {/* <AiOutlineMenu className="fs-1 text-light cursor-pointer" /> */}
      </div>
      <hr className="text-light" />
      <div className="s-body px-2">
        {favoriler.length === 0 ? (
          <p className="text-light">Henüz Favori Kelimeniz Yok</p>
        ) : (
          favArr?.map((fav, index) => {
            return favoriler[index]?.madde !== undefined ? (
              <Card className="my-2 d-flex justify-content-between" key={index}>
                <Card.Title className="text-center pt-2 d-flex justify-content-center align-items-center position-relative">
                  <h3>{favoriler[index]?.madde}</h3>
                  <div className="remove-fav d-flex justify-content-end position-absolute top-0 end-0">
                    <AiFillCloseCircle className="fs-2" />
                  </div>
                </Card.Title>
                <Card.Body>
                  {favoriler[index].anlamlarListe?.map((anlam, i) => {
                    return <p key={i}>- {anlam.anlam}</p>;
                  })}
                </Card.Body>
              </Card>
            ) : (
              ""
            );
          })
        )}
      </div>
    </div>
  );
}
