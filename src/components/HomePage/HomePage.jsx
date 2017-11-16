import React, { Component } from 'react';
import { getPage, deleteHotel } from '../../api/remote';
import HotelsList from './HotelsList';
import { Link } from 'react-router-dom';

export default class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hotels: []
        };

        this.deleteHotel = this.deleteHotel.bind(this);
    }

    componentDidMount() {
        this.getData();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.page !== this.props.match.params.page) {
            console.log('here');
            this.getData(Number(nextProps.match.params.page));
        }
    }

    async getData(page = Number(this.props.match.params.page) || 1) {
        const data = await getPage(page);
        this.setState({ hotels: data });
    }

    async deleteHotel(id) {
        try {
            const res = await deleteHotel(id);
        } catch (e) {}
        this.setState({ hotels: this.state.hotels.filter(h => h.id != id) });
        this.getData();
    }

    render() {
        const page = Number(this.props.match.params.page) || 1;

        return (
            <div className="container">
                <h1>Home Page</h1>
                <p>Welcome to our site.</p>
                {this.state.hotels.length === 0 ?
                    <p>Loading &hellip;</p> :
                    <HotelsList hotels={this.state.hotels} deleteHotel={this.deleteHotel} />}
                <div className="pagination">
                    {page > 1 && <Link to={'/view/' + (page - 1)}>&lt;</Link>}
                    <Link to={'/view/' + (page + 1)}>&gt;</Link>
                </div>
            </div>
        );
    }
}