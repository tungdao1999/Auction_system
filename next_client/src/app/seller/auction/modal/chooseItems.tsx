import BootstrapModal from "@/components/modal";
import { Card, Row } from "react-bootstrap";
import ItemCard from "./itemCard";
import React, { use, useEffect } from "react";
import { Item } from "@/app/entities/item";
import { createClientAxios } from "@/lib/axiosClient";

export interface ChooseItemsModalProps {
    show: boolean;
    handleClose: () => void;
    handleSelectItems: (selectedItems: Map<Item, number>) => void;
    selectedItems: Item[];
}

const ChooseItemsModal: React.FC<ChooseItemsModalProps> = ({ show, handleClose, handleSelectItems, selectedItems }) => {
    const [items, setItems] = React.useState<Item[]>([]);
    const [itemMap, setItemMap] = React.useState<Map<Item, number>>(new Map(selectedItems.map(item => [item, item.quantity])));
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const axiosClient = createClientAxios('seller');
                await axiosClient.get('/api/item/getItemBySeller'
                ).then(res => {
                    setItems(res.data);
                }).catch(err => { console.error("Error fetching items:", err) });
            }
            catch (error) {
                console.error("Error fetching items:", error);
            }
        }
        fetchItems();
    }, []);
    return (
        <BootstrapModal
            header="Choose Items"
            show={show} onClose={handleClose} size="xl"
            footer={
                <>
                    <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
                    <button type="button" className="btn btn-primary" onClick={() => handleSelectItems(itemMap)}>Select Items</button>
                </>
            }
            body={
                <div>
                    <Card className="border-0">
                        <Card.Body>
                            <Row>
                                {items.map((item, idx) => (
                                    <div key={item.id} className="col-4 mb-3">
                                        <ItemCard
                                            item={item}
                                            selected={selectedItems.some(selected => selected.id === item.id)}
                                            onSelect={(quantity) => {
                                                itemMap.set(item, quantity);
                                                setItemMap(new Map(itemMap));
                                            }}
                                            onDeselect={() => {
                                                itemMap.delete(item);
                                                setItemMap(new Map(itemMap));
                                            }}
                                        />
                                    </div>
                                ))}
                            </Row>
                        </Card.Body>
                    </Card>
                </div>
            }
            id="chooseItemsModal"
        >
        </BootstrapModal>
    )
};

export default ChooseItemsModal;