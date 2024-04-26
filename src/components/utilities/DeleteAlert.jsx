import React from "react";
import Modal from "react-bootstrap/Modal";
import { scrollToTopMethod } from "../app-helpers/AppHelpers";

const DeleteAlert = ({ setConfirm, show, Title = "Are you sure want to delete this?" }) => {
    return (
        <Modal className="delete-modal-widget" show={show} backdrop="static">
            <Modal.Body>
                <div className="delete-wrapper">
                    <div
                        className="icon-widget"
                        onClick={() => {
                            setConfirm(false);
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M13.46 12L19 17.54V19H17.54L12 13.46L6.46 19H5V17.54L10.54 12L5 6.46V5H6.46L12 10.54L17.54 5H19V6.46L13.46 12Z"
                                fill="#575C6B"
                            />
                        </svg>
                    </div>

                    <h2 className="title-txt text-uppercase">Are you sure?</h2>
                    <p className="delete-dec-txt">Are you sure you want to delete? This action cannot be undone.</p>
                    <div className="button-wrapper">
                        <button
                            onClick={() => {
                                setConfirm(false);
                            }}
                            className="cancel-btn btn"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => {
                                setConfirm(true);
                                scrollToTopMethod();
                            }}
                            className="cancel-btn delete-btn btn"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </Modal.Body>
            {/* <Modal.Footer>
                <Button
                    variant="secondary"
                    onClick={() => {
                        setConfirm(false);
                    }}
                >
                    Cancel
                </Button>
                <Button
                    variant="primary"
                    onClick={() => {
                        setConfirm(true);
                        scrollToTopMethod();
                    }}
                >
                    Confirm
                </Button>
            </Modal.Footer> */}
        </Modal>
    );
};

export default DeleteAlert;
