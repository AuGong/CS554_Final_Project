import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import ReactPaginate from "react-paginate";
import queries from "../queries";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";

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
                    <Button variant="primary">See More info</Button>
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
          initialPage={pagenum}
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
