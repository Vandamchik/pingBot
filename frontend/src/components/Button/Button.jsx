import React from 'react'

import styles from './Button.module.css';

export const ButtonComponent = ({children, ...props}) => {
    return (
        <button className={styles.button} {...props}>
            {children}
        </button>
    )
}