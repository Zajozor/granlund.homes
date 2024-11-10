import { useRef, useState, useEffect } from "react";
import styled from "styled-components";

import LightBulb from "../assets/light-bulb.svg";
import Pillar from "../assets/pillar.svg";
import Pipeline from "../assets/pipeline.svg";
import Thunder from "../assets/thunder.svg";
import Ventilation from "../assets/ventilation.svg";

const Container = styled.div`
  background: black;
`;

const ItemList = styled.div`
  display: flex;
  background: white;
  width: 100%;
  justify-content: center;
  gap: 1rem;
  padding: 4px 0;
  height: 5vh;

  img {
    height: 100%;
    aspect-ratio: 1;
    cursor: pointer;
  }
`;

const InputContainer = styled.div`
  height: 5vh;
  margin-top: 5vh;
`;

const svgFiles = [
  { id: "light-bulb", src: LightBulb },
  { id: "pillar", src: Pillar },
  { id: "pipeline", src: Pipeline },
  { id: "thunder", src: Thunder },
  { id: "ventilation", src: Ventilation },
];

const isMouseWithinImageBounds = (mousePos, pos) => {
  return (
    mousePos.x >= pos.x - 2 * pos.width &&
    mousePos.x <= pos.x + 2 * pos.width &&
    mousePos.y >= pos.y - 2 * pos.height &&
    mousePos.y <= pos.y + 2 * pos.height
  );
};

const FloorPlan = () => {
  const canvasRef = useRef(null);
  const [positions, setPositions] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [draggedImageIndex, setDraggedImageIndex] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const svgImages = useRef([]);
  const backgroundImage = useRef(new Image());

  const addItemToCanvas = (id) => {
    setPositions((positions) => [
      ...positions,
      { id, x: 300, y: 300, width: 25, height: 25 },
    ]);
  };

  // Handle floor plan upload
  const handleFloorPlanUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        backgroundImage.current.src = e.target.result;
        backgroundImage.current.onload = () => {
          drawCanvas({ removeExistingItems: true });
        };
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    svgImages.current = svgFiles.map(({ src }) => {
      const img = new Image();
      img.src = src;
      return img;
    });
  }, []);

  const drawCanvas = (prop?) => {
    const removeExistingItems = prop?.removeExistingItems;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const img = backgroundImage.current;
    const imgAspectRatio = img.width / img.height;
    const canvasAspectRatio = canvas.width / canvas.height;

    let drawWidth, drawHeight, offsetX, offsetY;

    if (canvasAspectRatio > imgAspectRatio) {
      drawHeight = canvas.height;
      drawWidth = img.width * (canvas.height / img.height);
      offsetX = (canvas.width - drawWidth) / 2;
      offsetY = 0;
    } else {
      drawWidth = canvas.width;
      drawHeight = img.height * (canvas.width / img.width);
      offsetX = 0;
      offsetY = (canvas.height - drawHeight) / 2;
    }

    context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

    if (removeExistingItems) {
      return setPositions([]);
    }

    positions.forEach((pos) => {
      const img = new Image();
      img.src = svgFiles.find((item) => item.id === pos.id).src;
      img.onload = () => {
        context.drawImage(img, pos.x, pos.y, 25, 25);
      };
    });
  };

  const savePositions = (newPositions) => {
    localStorage.setItem("canvasPositions", JSON.stringify(newPositions));
  };

  const handleMouseDown = (e) => {
    const mousePos = { x: e.clientX, y: e.clientY };
    positions.forEach((pos, index) => {
      if (isMouseWithinImageBounds(mousePos, pos)) {
        setDragging(true);
        setDraggedImageIndex(index);
        setOffset({ x: mousePos.x - pos.x, y: mousePos.y - pos.y });
      }
    });
  };

  const handleMouseMove = (e) => {
    if (dragging && draggedImageIndex !== null) {
      const mousePos = { x: e.clientX, y: e.clientY };
      const newPositions = [...positions];
      newPositions[draggedImageIndex] = {
        ...newPositions[draggedImageIndex],
        x: mousePos.x - offset.x,
        y: mousePos.y - offset.y,
      };

      setPositions(newPositions);
      drawCanvas();
    }
  };

  const handleMouseUp = () => {
    if (dragging) {
      setDragging(false);
      setDraggedImageIndex(null);
      savePositions(positions);
    }
  };

  useEffect(() => {
    drawCanvas();
  }, [positions]);

  return (
    <Container>
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{
          display: "block",
          height: "85vh",
          margin: "auto",
        }}
      />
      <InputContainer>
        <input
          type="file"
          accept="image/*"
          onChange={handleFloorPlanUpload}
          style={{ marginBottom: "10px" }}
        />
      </InputContainer>
      <ItemList>
        {svgFiles.map(({ src, id }) => (
          <img
            key={id}
            src={src}
            onClick={() => addItemToCanvas(id)}
            alt={id}
          />
        ))}
      </ItemList>
    </Container>
  );
};

export default FloorPlan;
