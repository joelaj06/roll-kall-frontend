import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Box } from "@mui/material";
import Tippy from "@tippyjs/react";
import "./default_actions.css";
import PropTypes from 'prop-types';


const editIcon = <FontAwesomeIcon icon={faPenToSquare}></FontAwesomeIcon>;
const deleteIcon = <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>;

function DefaultActions({
  editToolTip,
  deleteToolTip,
  onEditClick,
  onDeleteClick,
}) {

    const handleDeleteBtn = (event, params) => {
        console.log(event)
        onEditClick(params);
    }
  return (
    <Box>
      <Tippy content={editToolTip} placement="left">
        <button className="icon-btn edit" onClick={onEditClick}>
          {editIcon}
        </button>
      </Tippy>
      <Tippy content={deleteToolTip} placement="left">
        <button className="icon-btn delete" onClick={handleDeleteBtn}>
          {deleteIcon}
        </button>
      </Tippy>
    </Box>
  );
}

DefaultActions.propTypes = {
    onEditClick : PropTypes.func.isRequired,
    onDeleteClick : PropTypes.func.isRequired
}

export default DefaultActions;
