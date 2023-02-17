//! background-clip
import './index.scss'

function BackgroundClip() {
    return (
        <div className='background-clip'>
            <p className="border-box">The background extends behind the border.</p>
            <p className="padding-box">The background extends to the inside edge of the border.</p>
            <p className="content-box">The background extends only to the edge of the content box.</p>
            <p className="text">The background is clipped to the foreground text.</p>
        </div>
    )
}

export default BackgroundClip