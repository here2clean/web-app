import React from 'react';
import { Row, Col } from 'antd';

class Loading extends React.Component {
    render() {
        return (
            <div className='loadingContainer'>
                <div className='loadingDiv align-center'>
                    <Row>
                        <Col span={16} offset={4}>
                            <h1 className='white-h1'>Loading</h1>
                            <div className="lds-ellipsis">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default Loading;