import React from 'react'
import { Tooltip } from 'antd';
const ProspectChart = () => {
    const text = <span>+7%</span>
    return (
        <>
            <div className="prospect-chart-box d-flex position-relative justify-content-around align-items-center mt-5">
                <div className="prospect-chart-percent d-flex flex-column justify-content-around align-items-center gap-5">
                    <div className='prospect-left-percent'>100%</div>
                    <div className='prospect-left-percent'>60%</div>
                    <div className='prospect-left-percent'>20%</div>
                    <div className='prospect-left-percent'>0%</div>
                </div>
                <div className="prospect-chart-percent-bars  mt-5 d-flex align-items-end gap-4">
                    <div className="prospect-bar-1  rounded-4 p-2">32%</div>
                    <Tooltip placement="top" title={text}>
                        <div className="prospect-bar-2 rounded-4 p-2">91%</div>
                    </Tooltip>

                    <div className="prospect-bar-3 rounded-4 p-2">20%</div>
                </div>

                <div className="prospect-chart-limit-line"></div>
                <div className="prospect-chart-limit-line-2"></div>
                <div className="prospect-chart-limit-line-3"></div>
                <div className="prospect-chart-limit-line-4"></div>
            </div>
        </>
    )
}

export default ProspectChart
