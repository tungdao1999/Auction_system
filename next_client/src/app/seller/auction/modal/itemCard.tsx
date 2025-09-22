import { Item } from "@/app/entities/item";
import { useState } from "react";
import { Button, Row } from "react-bootstrap";

const ItemCard: React.FC<{ item: Item, selected: boolean, onSelect: (quantity: number) => void }> = ({ item, selected, onSelect }) => {
    const [quantity, setQuantity] = useState(1);
    const [selectedState, setSelectedState] = useState(selected);
    return (
        <div className="card mt-3 ms-3" style={{ width: '18rem' }}>
            <img src={item.image} className="card-img-top" alt={item.name} style={{ height: 180, objectFit: 'cover' }} />
            <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <Row className="align-items-center">
                    <div className="col-5">
                        <input
                            type="number"
                            className="form-control"
                            value={quantity}
                            min={1}
                            max={item.quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            style={{ width: "100%" }}
                        />
                    </div>
                    <div className="col-7 d-flex justify-content-end">
                        <Button
                            variant={selectedState ? "success" : "primary"}
                            onClick={() => {
                                setSelectedState(!selectedState);
                                onSelect(quantity);
                            }}
                            disabled={quantity < 1 || quantity > item.quantity}
                        >
                            {selectedState ? "Selected" : "Select"}
                        </Button>
                    </div>
                </Row>
            </div>
        </div>
    );
}

export default ItemCard;