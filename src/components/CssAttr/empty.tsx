//! css :empty 伪类
import './index.scss'

export const Empty = () => {
    return (
        <>
            <div className="box-empty">
                {/* I will be lime */}
            </div>
            <div className="box-empty">I will be pink</div>
            <div className="box-empty">
                {/* I will be pink because of the whitespace around this comment */}
            </div>

        </>
    )
}