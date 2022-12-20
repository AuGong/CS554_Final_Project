import React, { useState, useEffect } from "react";
import Pagination from "react-bootstrap/Pagination";

const PetPagination = (props) => {
  const [pageArray, setPageArray] = useState([]);

  useEffect(() => {
    let totPages = parseInt(props.totPages);
    let currentPage = parseInt(props.currentPage);
    let pageArr = [];
    if (totPages > 1) {
      if (totPages <= 9) {
        let i = 1;
        while (i <= totPages) {
          pageArr.push(i);
          i++;
        }
      } else {
        if (currentPage <= 5) pageArr = ["1P", "2P", "3P", "4P", "5P", "6P", "7P", "8P", "", totPages + "P"];
        else if (totPages - currentPage <= 4)
          pageArr = [
            "1P",
            "",
            String(totPages - 7) + "P",
            String(totPages - 6) + "P",
            String(totPages - 5) + "P",
            String(totPages - 4) + "P",
            String(totPages - 3) + "P",
            String(totPages - 2) + "P",
            String(totPages - 1) + "P",
            totPages + "P",
          ];
        else
          pageArr = [
            "1P",
            "",
            String(currentPage - 3) + "P",
            String(currentPage - 2) + "P",
            String(currentPage - 1) + "P",
            String(currentPage) + "P",
            String(currentPage + 1) + "P",
            String(currentPage + 2) + "P",
            String(currentPage + 3) + "P",
            "",
            totPages + "P",
          ];
      }
    }
    setPageArray(pageArr);
  }, [props.currentPage, props.totPages]);

  return (
    <React.Fragment>
      {props.children}
      <div style={{ marginTop: "15px" }}>
        <Pagination style={{ justifyContent: "center" }}>
          {pageArray.map((ele, ind) => {
            const toReturn = [];
            if (ind === 0) {
              toReturn.push(
                <Pagination.First
                  key={"firstpage"}
                  disabled={props.currentPage === 1 ? true : false}
                  onClick={
                    props.currentPage === 1
                      ? () => {}
                      : () => {
                          props.pageClicked(1);
                        }
                  }
                />
              );

              toReturn.push(
                <Pagination.Prev
                  key={"prevpage"}
                  disabled={props.currentPage === 1 ? true : false}
                  onClick={
                    props.currentPage === 1
                      ? () => {}
                      : () => {
                          props.pageClicked(props.currentPage - 1);
                        }
                  }
                />
              );
            }

            if (ele === "") toReturn.push(<Pagination.Ellipsis key={ind} />);
            else
              toReturn.push(
                <Pagination.Item
                  key={ind}
                  active={props.currentPage === parseInt(ele) ? true : false}
                  onClick={
                    props.currentPage === parseInt(ele)
                      ? () => {}
                      : () => {
                          props.pageClicked(parseInt(ele));
                        }
                  }
                >
                  {ele}
                </Pagination.Item>
              );

            if (ind === pageArray.length - 1) {
              toReturn.push(
                <Pagination.Next
                  key={"nextpage"}
                  disabled={props.currentPage === parseInt(ele) ? true : false}
                  onClick={
                    props.currentPage === parseInt(ele)
                      ? () => {}
                      : () => {
                          props.pageClicked(props.currentPage + 1);
                        }
                  }
                />
              );

              toReturn.push(
                <Pagination.Last
                  key={"lastpage"}
                  disabled={props.currentPage === parseInt(ele) ? true : false}
                  onClick={
                    props.currentPage === parseInt(ele)
                      ? () => {}
                      : () => {
                          props.pageClicked(parseInt(ele));
                        }
                  }
                />
              );
            }
            return toReturn;
          })}
        </Pagination>
      </div>
    </React.Fragment>
  );
}

export default PetPagination;
