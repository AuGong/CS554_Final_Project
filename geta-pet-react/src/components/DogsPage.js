import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import ReactPaginate from "react-paginate";
import queries from "../queries";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

const DogsPage = () => {
  const [pagenum, setPagenum] = useState(1);
  const [dataList, setDataList] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  const handlePageClick = (event) => {
    setPagenum(event.selected + 1);
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
                    <Button variant="primary" onClick={handleShow}>
                      See More info
                    </Button>
                    <Modal
                      show={show}
                      onHide={handleClose}
                      animation={true}
                      backdrop={false}
                      aria-labelledby="contained-modal-title-vcenter"
                      size={"lg"}
                    >
                      <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                          Modal heading
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
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
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                          Close
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </Card.Body>
                </Card>
              </div>
            );
          })}
        </Row>
        <ReactPaginate
          nextLabel="Next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={16}
          previousLabel="Prev"
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          breakLabel="..."
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
          containerClassName={"pagination"}
          activeClassName={"active"}
          renderOnZeroPageCount={null}
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
