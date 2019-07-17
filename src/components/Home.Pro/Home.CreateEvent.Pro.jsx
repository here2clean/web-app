import React from 'react';
import {withUserContext} from "../../App";
import {Button, DatePicker, Form, Input, Modal} from "antd";
import {compose} from "recompose";
import moment from 'moment';
import {PostQuery} from "../GetQuery";

const dateFormat = 'YYYY-MM-DD';

class CreateEvent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            beginDate: null,
            endDate: null,
            name: null,
            description: null,
            location: null,
            urlImage: null
        };
        this.sendEvent = this.sendEvent.bind(this);
    }

    dateChange = (name,event) => {
        this.setState({ [name]: moment(event).format(dateFormat) });
    };

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    sendEvent() {
        let {beginDate, endDate} = this.state;
        let beginParsedDate = new Date(beginDate);
        let endParsedDate = new Date(endDate);
        beginDate = [beginParsedDate.getDay(),beginParsedDate.getMonth(),beginParsedDate.getFullYear()].join('/');
        endDate = [endParsedDate.getDay(),endParsedDate.getMonth(),endParsedDate.getFullYear()].join('/');
        const event = {
            "beginDate": beginDate,
            "endDate": endDate,
            "location": this.state.location,
            "name": this.state.name,
            "description": this.state.description,
            "urlImage": this.state.urlImage,
            "association_id": this.props.context.user.id
        };
        PostQuery("/event/register", JSON.stringify(event), this.props.context.user.authToken)
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const {beginDate, endDate, name, description, location, urlImage} = this.state;
        return (
            <Modal
                visible={this.props.visible}
                onCancel={this.props.close}
                title="Event Registration"
                footer={[
                    <Button key="back" onClick={this.props.close}>
                        Cancel
                    </Button>,
                    <Button key="submit" onClick={this.sendEvent} type="primary">
                        Create
                    </Button>,
                ]}
            >
                <Form>
                    <Form.Item label="Begin Date">
                        {getFieldDecorator('beginDate', {
                            rules: [{ required: true, message: 'Please input the begin date!' }],
                            onChange: (e) => this.dateChange('beginDate',e, 'note'),
                            value: beginDate
                        })(
                            <DatePicker name="beginDate" />
                        )}
                    </Form.Item>
                    <Form.Item label="End Date">
                        {getFieldDecorator('endDate', {
                            rules: [{ required: true, message: 'Please input the begin date!' }],
                            onChange: (e) => this.dateChange('endDate',e, 'note'),
                            value: endDate
                        })(
                            <DatePicker name="endDate" />
                        )}
                    </Form.Item>
                    <Form.Item label="Name">
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: 'Please input the name!' }],
                            onChange: (e) => this.onChange(e, 'note'),
                            value: name
                        })(
                            <Input name="name" />
                        )}
                    </Form.Item>
                    <Form.Item label="Description">
                        {getFieldDecorator('description', {
                            rules: [{ required: true, message: 'Please input the description!' }],
                            onChange: (e) => this.onChange(e, 'note'),
                            value: description
                        })(
                            <Input name="description" />
                        )}
                    </Form.Item>
                    <Form.Item label="Location">
                        {getFieldDecorator('location', {
                            rules: [{ required: true, message: 'Please input the location!' }],
                            onChange: (e) => this.onChange(e, 'note'),
                            value: location
                        })(
                            <Input name="location" />
                        )}
                    </Form.Item>
                    <Form.Item label="Image URL">
                        {getFieldDecorator('urlImage', {
                            rules: [{ required: false}],
                            onChange: (e) => this.onChange(e, 'note'),
                            value: urlImage
                        })(
                            <Input name="urlImage" />
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}

const WrappedCreateEvent = compose(
    Form.create({ name: 'createevent' }), withUserContext)(CreateEvent);
export {WrappedCreateEvent};