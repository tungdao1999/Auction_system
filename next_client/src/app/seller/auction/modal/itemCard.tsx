import { Item } from "@/app/entities/item";
import { useEffect, useState } from "react";
import { Button, Row } from "react-bootstrap";

const ItemCard: React.FC<{ item: Item, selected: boolean, onSelect: (quantity: number) => void, onDeselect: () => void }> = ({ item, selected, onSelect, onDeselect }) => {
    const [quantity, setQuantity] = useState(0);
    const [selectedState, setSelectedState] = useState<boolean>(false);
    useEffect(() => {
        setQuantity(item.quantity);
        setSelectedState(selected);
    }, [item, selected]);
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
                                if (selectedState) {
                                    onDeselect();
                                } else {
                                    onSelect(quantity);
                                }
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