import React, { useEffect, useState } from "react";
import { Button, Card, Badge } from "react-bootstrap";
import Search from "../components/Search";
import { useSelector, useDispatch } from "react-redux";
import { fetchTdk, fetchTdkSearching } from "../features/sozlukAction";
import { sozlukSelector } from "../features/sozlukSlice";
import { ThreeDots } from "react-loading-icons";

export default function RondomTdk() {
  const dispatch = useDispatch();
  const { soz, loading, hasErrors } = useSelector(sozlukSelector).tdkSozluk;

  const [num, setNum] = useState(Math.floor(Math.random() * 92411));
  const [tdk, setTdk] = useState({});
  const [isSearch, setIsSearch] = useState("");

  useEffect(() => {
    setNum(Math.floor(Math.random() * 92411));
    dispatch(fetchTdk(num));
  }, [dispatch]);

  useEffect(() => {
    if (isSearch === "") {
      dispatch(fetchTdk(Math.floor(Math.random() * 92411)));
    }
    if (isSearch !== "") {
      dispatch(fetchTdkSearching(isSearch));
    }
  }, [isSearch]);

  const handleNewSoz = () => {
    setNum(Math.floor(Math.random() * 92411));
    dispatch(fetchTdk(num));
  };

  const renderSozluk = () => {
    if (loading)
      return (
        <div className="d-flex justify-content-center">
          <ThreeDots stroke="#000" fill="2e2e2e" speed={0.75} width="3rem" />
        </div>
      );
    if (hasErrors) return <div>Veri Çekilemedi</div>;
    if (!soz)
      return (
        <div className="d-flex justify-content-center text-danger fs-1">
          Aradığınız Kelime ile herhangi bir sonuç bulunamadı!
        </div>
      );
    return (
      <>
        <Card className="text-center w-75 m-auto" bg="success" text={"light"}>
          <Card.Header className="fs-2 d-flex justify-content-between">
            <h1 className="align-self-center">{soz?.madde}</h1>
            <Button
              variant="dark"
              className="button-review"
              onClick={handleNewSoz}
            >
              Yenile
            </Button>
          </Card.Header>
          <Card.Body>
            <Card.Text className="fs-3">ANLAMLAR</Card.Text>
            <p className="d-flex flex-column justify-content-center align-items-center">
              <span className="fw-bold fs-3 text-decoration-underline"> {soz?.madde} </span> kelimesinin toplamda{" "}
              {soz?.anlamlarListe?.length} anlamı bulunmaktadır.{" "}
            </p>
            {soz?.anlamlarListe?.map((soz, i) => (
              <div key={i}>
                <p className="bg-light p-2 text-dark d-flex justify-content-between align-items-center">
                  <Badge bg="dark">{i + 1}</Badge>
                  <span className="text-secondary fst-italic text-decoration-underline align-self-center p-2">
                    {!soz?.ozelliklerListe
                      ? ""
                      : soz?.ozelliklerListe[0]?.tam_adi}
                  </span>{" "}
                  <span
                    className="d-flex justify-content-center"
                    style={{ width: "90%" }}
                  >
                    {soz?.anlam}
                  </span>
                </p>

                {!soz.orneklerListe ? (
                  ""
                ) : (
                  <div>
                    <h5>Örnek</h5>
                    {soz?.orneklerListe?.map((orn, indis) => (
                      <div key={orn.ornek_id}>
                        <p className="mb-0">{orn.ornek}</p>
                        <p className=" fst-italic">
                          {" "}
                          - {orn?.yazar?.map((author) => author.tam_adi)}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
                <hr />
              </div>
            ))}
          </Card.Body>
        </Card>
        {!soz?.atasozu ? (
          ""
        ) : (
          <div className="row mt-5 gap-3 justify-content-evenly mb-5">
            <h2 className="text-center text-decoration-underline">
              Ata Sözleri
            </h2>
            {soz.atasozu?.map((ata, ind) => (
              <Card
                key={ind}
                bg="dark"
                className="col-12 col-sm-6 col-md-4 col-lg-3 px-1 py-4 text-light"
              >
                <Card.Body className="row d-flex justify-content-center text-light text-center">
                  <div className="">{ata.madde}</div>
                </Card.Body>
              </Card>
            ))}
          </div>
        )}
      </>
    );
  };

  return (
    <div className="container mt-5">
      <Search setIsSearch={setIsSearch} />
      {renderSozluk()}
    </div>
  );
}
