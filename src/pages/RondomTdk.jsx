import React, { useEffect, useState } from "react";
import { Button, Card, Badge } from "react-bootstrap";
import Search from "../components/Search";
import { useSelector, useDispatch } from "react-redux";
import { fetchTdk } from "../features/sozlukAction";
import { sozlukSelector } from "../features/sozlukSlice";
import { ThreeDots } from "react-loading-icons";
import SozlukTabs from "../components/SozlukTabs";

export default function RondomTdk() {
  const dispatch = useDispatch();
  const { soz, loading, hasErrors } = useSelector(sozlukSelector).tdkSozluk;
  console.log(soz);
  const [num, setNum] = useState(Math.floor(Math.random() * 92411));

  useEffect(() => {
    setNum(Math.floor(Math.random() * 92411));
    dispatch(fetchTdk(num));
  }, [dispatch]);

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
        <Card
          className="text-center w-75 m-auto mb-5 mobile-card-wrapper"
          bg="success"
          text={"light"}
        >
          <Card.Header className="fs-2 d-flex justify-content-between mobile-card-header">
            <h1 className="align-self-center">{soz?.madde}</h1>
            <Button
              variant="dark"
              className="button-review"
              onClick={handleNewSoz}
            >
              Yenile
            </Button>
          </Card.Header>
          <Card.Body className="mobile-card-body">
            <Card.Text className="fs-3">
              <p className="d-flex flex-column justify-content-center align-items-center">
                <span className="fw-bold fs-3 text-decoration-underline">
                  {soz?.madde}
                </span>
                kelimesinin toplamda {soz?.anlamlarListe?.length} anlamı
                bulunmaktadır.
              </p>
            </Card.Text>
            {soz?.lisan ? <p className="fs-5 mb-5">Lisan: {soz?.lisan}</p> : ""}
            {soz?.anlamlarListe?.map((soz, i) => (
              <div key={i} className="bg-light shadow">
                <p className=" p-2 pt-3 pb-0 mb-0 text-dark d-flex justify-content-between align-items-center position-relative align-items-center">
                  <Badge bg="dark position-absolute badge-list">
                    {i + 1}{" "}
                    {!soz?.ozelliklerListe ? (
                      ""
                    ) : (
                      <span className="text-light fst-italic text-decoration-underline align-self-center p-2">
                        {!soz?.ozelliklerListe
                          ? ""
                          : soz?.ozelliklerListe[0]?.tam_adi}
                      </span>
                    )}
                  </Badge>

                  <span className="d-flex justify-content-center align-items-center w-100 fs-4 lh-sm">
                    {soz?.anlam}
                  </span>
                </p>
                {!soz.orneklerListe ? (
                  ""
                ) : (
                  <div className="text-dark flex-column d-flex justify-content-center px-5">
                    <hr className="bg-dark" />

                    {/* <h5 className="me-2">Örnek</h5> */}
                    {soz?.orneklerListe?.map((orn, indis) => (
                      <div key={orn.ornek_id}>
                        <p className="mb-0 pb-0">{orn.ornek}</p>
                        {!orn?.yazar ? (
                          ""
                        ) : (
                          <p className=" fst-italic pb-0 mb-0">
                            - {orn?.yazar?.map((author) => author.tam_adi)}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                <hr />
              </div>
            ))}
          </Card.Body>
          {!soz.birlesikler ? (
            ""
          ) : (
            <Card.Footer>
              <SozlukTabs />
            </Card.Footer>
          )}
        </Card>
      </>
    );
  };

  return (
    <div className="container mobile-wrapper mt-5">
      <Search />
      {renderSozluk()}
    </div>
  );
}
