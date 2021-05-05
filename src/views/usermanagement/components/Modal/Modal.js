import React from 'react';
import './Modal.css';

const configurations = {
    CENTER: "Modal",
    RIGHT: "Modal_rightAligned",
    LEFT: "Modal_leftAligned",
    TOP_RIGHT: "Modal_topRight"
};

const contentConfigurations = {
    FULL: "Modal_content",
    TOP: "Modal_contentTop",
    BOTTOM: "Modal_contentBottom",
    TRANSPARENT: "Modal_contentTransparent"
};

const Modal = ({children,
                   onClose,
                   opaqueBackground = true,
                   configuration = "CENTER",
                   contentConfiguration = "FULL",
                   fitContent = false}) => {
    let contentClass = contentConfigurations[contentConfiguration] ?? "Modal_content";
    if (fitContent) {
        contentClass += " Modal_contentFitContent";
    }

    if(opaqueBackground) {
        return (
            <div className={(configurations[configuration] ?? "Modal")}
                 onClick={onClose}>
                <div className={contentClass} onClick={e => e.stopPropagation()}>
                    {children}
                </div>
            </div>
        );
    } else {
        return (
            <div style={{backgroundColor: 'rgba(0, 0, 0, 0)'}}
                 className={(configurations[configuration] ?? "Modal")}
                 onClick={onClose}>
                <div className={contentClass} onClick={e => e.stopPropagation()}>
                    {children}
                </div>
            </div>
        );
    }

};

export default Modal;
