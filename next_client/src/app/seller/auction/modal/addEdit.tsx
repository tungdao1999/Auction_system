import { Auction } from "@/app/entities/auction";
import { Item } from "@/app/entities/item";
import BootstrapModal from "@/components/modal";
import { createClientAxios } from "@/lib/axiosClient";
import React, { useState } from "react";
import { Button, Form, Row, Alert } from "react-bootstrap";
import ChooseItemsModal from "./chooseItems";

interface AuctionFormData {
    title: string;
    startingPrice: number;
    startTime: string;
    description: string;
    presetDuration: number;
    mediaType: string;
    mediaFile?: File;
}

const AddEditModal: React.FC<{ auction?: Auction; onClose: () => void; mode: 'add' | 'edit' | 'view' | 'hide'}> 
    = ({ auction, onClose, mode }) => {
    const [mediaType, setMediaType] = useState<string>(auction?.mediaType || "image");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>("");
    const [showChooseItemsModal, setShowChooseItemsModal] = useState(false);
    const [selectedItems, setSelectedItems] = useState<Item[]>([]);
    const [submited, setSubmitted] = useState(false);
    
    // Form data state
    const [formData, setFormData] = useState<AuctionFormData>({
        title: auction?.title || "",
        startingPrice: auction?.startingPrice || 0,
        startTime: auction?.startTime || "",
        description: auction?.description || "",
        presetDuration: auction?.presetDuration || 60,
        mediaType: auction?.mediaType || "image",
    });

    // Handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? Number(value) : value
        }));
    };

    // Handle file upload
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData(prev => ({ ...prev, mediaFile: file }));
        }
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            setSubmitted(true);
            // Validation
            if (!formData.title.trim()) {
                throw new Error("Title is required");
            }
            if (formData.startingPrice <= 0) {
                throw new Error("Starting price must be greater than 0");
            }
            if (!formData.startTime) {
                throw new Error("Start time is required");
            }

            // Prepare form data for API
            const submitData = new FormData();
            submitData.append('title', formData.title);
            submitData.append('auctionId', auction ? auction.id.toString() : '0');
            submitData.append('startingPrice', formData.startingPrice.toString());
            submitData.append('startTime', formData.startTime);
            submitData.append('description', formData.description);
            submitData.append('presetDuration', formData.presetDuration.toString());
            submitData.append('mediaType', formData.mediaType);
            submitData.append('items', JSON.stringify(selectedItems.map(item => ({ id: item.id, quantity: item.quantity }))));
            
            if (formData.mediaFile) {
                submitData.append('mediaFile', formData.mediaFile);
            }

            const axiosClient = await createClientAxios('seller');
            const url = auction ? `/api/auction/${auction.id}` : '/api/auction/createAuction';
            // API call (replace with your actual API endpoint)
            const response = await axiosClient({
                url: url,
                method: auction ? 'PUT' : 'POST',
                data: submitData,
            }).then(res => {
                const result = res.data;
                return result;
            }).catch(err => {
                throw new Error(err.response?.data?.message || 'Failed to save auction');
            }).finally(() => {
                setLoading(false);
                setSubmitted(false);
            });
           
            // Close modal and refresh data
            onClose();
            
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };
    return (
        <BootstrapModal
            id="editAuctionModal"
            header={auction ? "Edit Auction" : "Schedule New Auction"}
            body={
            <div>
                {error && (
                    <Alert variant="danger" dismissible onClose={() => setError("")}>
                        {error}
                    </Alert>
                )}
                
                <Form onSubmit={handleSubmit}>
                        <Row>
                            <Form.Group className="mb-3 col-6" controlId="title">
                                <Form.Label>Auction Title</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    name="title"
                                    placeholder="Enter auction title" 
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    required 
                                />
                                <Form.Text className="text-muted"></Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3 col-6" controlId="startingPrice">
                                <Form.Label>Starting Price (VND)</Form.Label>
                                <Form.Control 
                                    type="number" 
                                    name="startingPrice" 
                                    value={formData.startingPrice}
                                    onChange={handleInputChange}
                                    min="0"
                                    step="1000"
                                    required 
                                />
                                <Form.Text className="text-muted"></Form.Text>
                            </Form.Group>
                        </Row>
                <Form.Group className="mb-3" controlId="startTime">
                    <Form.Label>Start Time</Form.Label>
                    <Form.Control 
                        type="datetime-local" 
                        name="startTime"
                        value={formData.startTime}
                        onChange={handleInputChange}
                        required 
                    />
                    <Form.Text className="text-muted"></Form.Text>
                </Form.Group>
                <Row className="mb-3 align-items-end">
                    <Form.Group className="col-9" controlId="items">
                        <Form.Label>Items</Form.Label>
                        <Form.Control
                            type="text"
                            value={`${selectedItems.length} items selected`}
                            name="items"
                            readOnly
                        />
                    </Form.Group>
                    <div className="col-3 d-flex align-items-end">
                        <Button variant="outline-primary" onClick={() => setShowChooseItemsModal(true)} className="w-100">
                            Add Item
                        </Button>
                    </div>
                </Row>
                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control 
                        as="textarea" 
                        rows={3} 
                        name="description"
                        placeholder="Enter auction description" 
                        value={formData.description}
                        onChange={handleInputChange}
                    />
                    <Form.Text className="text-muted"></Form.Text>
                </Form.Group>
                <Row className="mb-3">
                    <Form.Group controlId="presetDuration" className="mb-3 col-6">
                        <Form.Label>Preset Duration</Form.Label>
                        <Form.Control 
                            type="number" 
                            name="presetDuration"
                            value={formData.presetDuration}
                            onChange={handleInputChange}
                            min="1"
                        />
                        <Form.Text className="text-muted">Duration in minutes</Form.Text>
                    </Form.Group>
                    <Form.Group controlId="mediaType" className="mb-3 col-6">
                        <Form.Label>Media Type</Form.Label>
                        <Form.Control 
                            as="select" 
                            name="mediaType"
                            value={formData.mediaType}
                            onChange={(e) => {
                                setMediaType(e.target.value);
                                handleInputChange(e);
                            }}
                        >
                            <option value="image">Image</option>
                            <option value="video">Video</option>
                        </Form.Control>
                    </Form.Group>
                </Row>
                {mediaType === "image" ? (
                    <Form.Group className="mb-3" controlId="imageUpload">
                        <Form.Label>Upload Image</Form.Label>
                        <Form.Control 
                            type="file" 
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                        <Form.Text className="text-muted">Supported formats: JPG, PNG, etc.</Form.Text>
                    </Form.Group>
                ) : (
                    <Form.Group className="mb-3" controlId="videoUpload">
                        <Form.Label>Upload Video</Form.Label>
                        <Form.Control 
                            type="file" 
                            accept="video/*"
                            onChange={handleFileChange}
                        />
                        <Form.Text className="text-muted">Supported formats: MP4, AVI, etc.</Form.Text>
                    </Form.Group>
                )}
                
                <div className="d-flex justify-content-end gap-2">
                    <Button variant="secondary" onClick={onClose} disabled={loading}>
                        Cancel
                    </Button>
                    <Button variant="primary" type="submit" disabled={loading}>
                        {loading ? (
                            <>
                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                {mode === 'edit' ? "Saving..." : "Scheduling..."}
                            </>
                        ) : (
                            mode === 'edit' ? "Save Changes" : "Schedule Auction"
                        )}
                    </Button>
                </div>
                </Form>

                <ChooseItemsModal
                    show={showChooseItemsModal}
                    handleClose={() => setShowChooseItemsModal(false)}
                    selectedItems={selectedItems}
                    handleSelectItems={(items) => {
                        const itemsArray: Item[] = [];
                        items.forEach((quantity, item) => {
                            item.quantity = quantity;
                            itemsArray.push(item);
                        });
                        setSelectedItems(itemsArray);
                        setShowChooseItemsModal(false);
                    }}
                 ></ChooseItemsModal>
            </div>
            }
            size="lg"
            show={mode !== 'hide'}
            onClose={onClose}
        >
        </BootstrapModal>
    );
};

export default AddEditModal;
