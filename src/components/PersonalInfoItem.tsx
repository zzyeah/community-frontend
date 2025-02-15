import React from 'react'
import styles from '@/styles/PersonalInfoItem.module.css';

export interface PersonalInfoItemProps {
  info: {
    itemName: string;
    itemValue: string;
  }
}

function PersonalInfoItem(props: PersonalInfoItemProps) {
  return (
    <div className={styles.infoContainer}>
      <div className={styles.left}>
        <div>{props.info.itemName}: </div>
        <div>{props.info.itemValue}</div>
      </div>
    </div>
  )
}

export default PersonalInfoItem
