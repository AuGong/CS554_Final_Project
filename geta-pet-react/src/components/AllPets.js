import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";

const AllPets = () => {

  return (
    <div>
      <h1>ADOPT YOUR BUDDY</h1>
      <Row>
        <div className="col-lg-4 col-md-6 col-sm-12">
          <Card
            style={{ width: "15rem", textAlign: "center" }}
            className="mb-1 mt-2 ml-1 mr-1"
          >
            <Card.Img
              src="https://raw.githubusercontent.com/mickylab/markdown-pic/main/dog.png"
              alt="Dog image"
              style={{ opacity: 0.5 }}
            />
            <Card.ImgOverlay>
              <Card.Title>Dog Buddies</Card.Title>
              <Card.Text>
                "A dog is the only thing on earth that loves you more than he
                loves himself."
              </Card.Text>
              <Card.Text>- Josh Billings</Card.Text>
              <Button variant="primary" href="/pets/dog">
                See Dog Buddies
              </Button>
            </Card.ImgOverlay>
          </Card>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12">
          <Card
            style={{ width: "15rem", textAlign: "center" }}
            className="mb-1 mt-2 ml-1 mr-1"
          >
            <Card.Img
              src="https://raw.githubusercontent.com/mickylab/markdown-pic/main/Cat.png"
              alt="Cat image"
              style={{ opacity: 0.5 }}
            />
            <Card.ImgOverlay>
              <Card.Title>Cat Buddies</Card.Title>
              <Card.Text>
                "In ancient times cats were worshipped as gods; they have not
                forgotten this."
              </Card.Text>
              <Card.Text>- Terry Pratchett</Card.Text>
              <Button variant="primary" href="/dogs">
                See Cat Buddies
              </Button>
            </Card.ImgOverlay>
          </Card>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12">
          <Card
            style={{ width: "15rem", textAlign: "center" }}
            className="mb-1 mt-2 ml-1 mr-1"
          >
            <Card.Img
              src="https://raw.githubusercontent.com/mickylab/markdown-pic/main/Rabbit.png"
              alt="Rabbit image"
              style={{ opacity: 0.5 }}
            />
            <Card.ImgOverlay>
              <Card.Title>Rabbit Buddies</Card.Title>
              <Card.Text>"Kids love rabbits... they just like them."</Card.Text>
              <Card.Text>- John Bach</Card.Text>
              <Button variant="primary" href="/dogs">
                See Rabbit Buddies
              </Button>
            </Card.ImgOverlay>
          </Card>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12">
          <Card
            style={{ width: "15rem", textAlign: "center" }}
            className="mb-1 mt-2 ml-1 mr-1"
          >
            <Card.Img
              src="https://raw.githubusercontent.com/mickylab/markdown-pic/main/Bird.png"
              alt="Bird image"
              style={{ opacity: 0.5 }}
            />
            <Card.ImgOverlay>
              <Card.Title>Bird Buddies</Card.Title>
              <Card.Text>
                "I'd rather learn from one bird how to sing than teach ten
                thousand stars how not to dance."
              </Card.Text>
              <Card.Text>- Poet E. E. Cummings</Card.Text>
              <Button variant="primary" href="/dogs">
                See Bird Buddies
              </Button>
            </Card.ImgOverlay>
          </Card>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12">
          <Card
            style={{ width: "15rem", textAlign: "center" }}
            className="mb-1 mt-2 ml-1 mr-1"
          >
            <Card.Img
              src="https://raw.githubusercontent.com/mickylab/markdown-pic/main/Horse.png"
              alt="Horse image"
              style={{ opacity: 0.5 }}
            />
            <Card.ImgOverlay>
              <Card.Title>Horse Buddies</Card.Title>
              <Card.Text>
                "No hour of life is wasted that is spent in the saddle."
              </Card.Text>
              <Card.Text>- Winston Churchill</Card.Text>
              <Button variant="primary" href="/dogs">
                See Horse Buddies
              </Button>
            </Card.ImgOverlay>
          </Card>
        </div>
      </Row>
    </div>
  );
};

export default AllPets;
