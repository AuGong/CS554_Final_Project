import React, {useState, useEffect} from 'react';
import {useNavigate,useParams} from 'react-router-dom';
import './App.css';
import { useAuthentication } from '../firebase/AuthContext';
import {useQuery,useMutation} from '@apollo/client';
import queries from '../queries';
import PetPagination from "./PetPagination";


const Likes = (props) =>{
    const [dataList, setDataList] = useState([]);
    const [updateLike] = useMutation(queries.UPLOAD_LIKE);
    const { currentUser } = useAuthentication();
    const { pagenum } = useParams();
    const navigate = useNavigate();
    const {loading, error, data} = useQuery(queries.GET_PET_LIST,{
        fetchPolicy:"cache-and-network",
        variables: {
            pageNum: Number(pagenum),
            currentUserId: currentUser ? currentUser.uid : null,
          }
    });

    useEffect(() => {
        let petList = [];
        if (data) petList = data.petList;
        setDataList(petList);
      }, [data]);

    const handlePageClick = (pagenum) => {
        navigate(`/likes/${pagenum}`, {replace: true});
    };

    if (data) {
        return (
          <div>
            <h1>My likes</h1>
            <Row>
              {dataList.map((data, i) => {
                return (
                  <div className="col-lg-3 col-md-6 col-sm-12" key={i}>
                    <Card
                      style={{ width: "300px", textAlign: "center" }}
                      className="mb-1 mt-2 ml-1 mr-1"
                    >
                      <Card.Img
                        variant="top"
                        src={
                          data.photos && data.photos[0] && data.photos[0].medium
                            ? data.photos[0].medium
                            : "https://raw.githubusercontent.com/mickylab/markdown-pic/main/no-image-available.png"
                        }
                        alt="Dog image"
                        style={{width: "100%", height: "300px"}}
                      />
                      <Card.Body>
                        <Card.Title>{data.name}</Card.Title>
                        {currentUser && data.liked && (
                          <Button
                            variant="primary"
                            onClick={(e) => {
                              e.preventDefault();
                              updateLike({
                                variables: {
                                  symbol: "UNLIKE",
                                  userId: currentUser.uid,
                                  petId: data.id,
                                },
                              });
                              window.location.reload();
                            }}
                          >
                            Unlike It
                          </Button>
                        )}
                        {currentUser && !data.liked && (
                          <Button
                            variant="primary"
                            onClick={(e) => {
                              e.preventDefault();
                              updateLike({
                                variables: {
                                  symbol: "LIKE",
                                  userId: currentUser.uid,
                                  petId: data.id,
                                },
                              });
                              window.location.reload();
                            }}
                          >
                            Like It
                          </Button>
                        )}
                        <button
                          type="button"
                          className="btn btn-primary"
                          data-bs-toggle="modal"
                          data-bs-target={"#myModal" + i}
                        >
                          See more details
                        </button>
                        <div className="modal" tabIndex="-1" id={"myModal" + i}>
                          <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h1 className="modal-title">{data.name}</h1>
                                <button
                                  type="button"
                                  className="btn-close"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                ></button>
                              </div>
                              <div className="modal-body">
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
                              <div className="modal-footer">
                                <button
                                  type="button"
                                  className="btn btn-secondary"
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
              currentPage={Number(pagenum)}
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