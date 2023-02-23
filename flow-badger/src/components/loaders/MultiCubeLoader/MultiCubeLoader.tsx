import styles from './MultiCubeLoader.module.scss'

export const MultiCubeLoader = () => {
  return (
    <div className={styles['cube__container']}>
      <div className={styles['place__container']}>
        <div className={styles['cube']}></div>
      </div>
      <div className={styles['place__container']}>
        <div className={styles['cube']}></div>
      </div>
      <div className={styles['place__container']}>
        <div className={styles['cube']}></div>
      </div>
      {/* Copyright (c) 2022 by Ramona (https://codepen.io/codesofra/pen/XxRwQQ) */}
    </div>
  )
}
