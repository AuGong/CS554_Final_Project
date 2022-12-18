import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import queries from "../queries";
import PetPagination from "./PetPagination";

import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap/dist/css/bootstrap.css";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

const DogsPage = () => {
  const [pagenum, setPagenum] = useState(1);
  const [dataList, setDataList] = useState([]);

  const { loading, error, data } = useQuery(queries.GET_PET_LIST, {
    fetchPolicy: "cache-and-network",
    variables: {
      pageNum: Number(pagenum),
      petType: "Dog",
      location: null,
    },
  });

  useEffect(() => {
    let petList = [];
    if (data) petList = data.petList;
    setDataList(petList);
  }, [data]);

  const handlePageClick = (pagenum) => {
    setPagenum(pagenum);
  };

  if (data) {
    return (
      <div>
        <Row>
          {dataList.map((data, i) => {
            return (
              <div className="col-lg-3 col-md-6 col-sm-12">
                <Card
                  style={{ width: "15rem", textAlign: "center" }}
                  className="mb-1 mt-2 ml-1 mr-1"
                  key={i}
                >
                  <Card.Img
                    variant="top"
                    src={
                      data.photos && data.photos[0] && data.photos[0].medium
                        ? data.photos[0].medium
                        : "https://raw.githubusercontent.com/mickylab/markdown-pic/main/no-image-available.png"
                    }
                    alt="Dog image"
                  />
                  <Card.Body>
                    <Card.Title>{data.name}</Card.Title>
                    <button
                      type="button"
                      class="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target={"#myModal" + i}
                    >
                      See more details
                    </button>
                    <div class="modal" tabindex="-1" id={"myModal" + i}>
                      <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h1 class="modal-title">{data.name}</h1>
                            <button
                              type="button"
                              class="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div class="modal-body">
                            <Container>
                              <Row>
                                <Col>Breed</Col>
                                <Col>{data.breed}</Col>
                              </Row>
                              <Row>
                                <Col>Age</Col>
                                <Col>{data.age}</Col>
                              </Row>
                              <Row>
                                <Col>Gender</Col>
                                <Col>{data.gender}</Col>
                              </Row>
                              <Row>
                                <Col>Size</Col>
                                <Col>{data.size}</Col>
                              </Row>
                              <Row>
                                <Col>Contact</Col>
                                <Col>{data.contact}</Col>
                              </Row>
                              <Row>
                                <Col>Description</Col>
                                <Col>{data.description}</Col>
                              </Row>
                            </Container>
                          </div>
                          <div class="modal-footer">
                            <button
                              type="button"
                              class="btn btn-secondary"
                              data-bs-dismiss="modal"
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            );
          })}
        </Row>
        <PetPagination
          totPages={16}
          currentPage={pagenum}
          pageClicked={(page) => {
            handlePageClick(page);
          }}
        />
      </div>
    );
  } else if (loading) {
    return <div>Loading</div>;
  } else if (error) {
    return <div>{error.message}</div>;
  }
};

export default DogsPage;
