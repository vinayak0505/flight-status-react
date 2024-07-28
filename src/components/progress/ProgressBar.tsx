
import { CSSProperties } from 'react';
import Styles from './ProgressBar.module.scss';

interface customProgressStyle extends CSSProperties {
    '--completed': String;
}


const ProgressBar = ({ percentage }: { percentage: number }) => {
    const style: customProgressStyle = { '--completed': `${percentage}%` };


    return <div className={Styles.progress} style={style}>

        <div className={Styles.line_container}>
            <div className={Styles.line} />
            <div className={Styles.line} />
            <div className={Styles.line} />
        </div>
        <div className={Styles.progress_bar_border}>
            <div className={Styles.progress_bar} />
        </div>
        <div className={Styles.progress_icon}></div>

    </div>
}

export default ProgressBar;