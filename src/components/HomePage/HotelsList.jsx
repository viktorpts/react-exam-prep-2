import React, { Component } from 'react';
import HotelCard from './HotelCard';

export default class HotelsList extends Component {
    render() {
        return (
            <div>
                {this.props.hotels.map(h => (
                    <HotelCard
                        canDelete={h.id == 2}
                        del={() => this.props.deleteHotel(h.id)}
                        key={h.id}
                        id={h.id}
                        name={h.name}
                        location={h.location}
                        image={h.image} /> 
                ))}
            </div>
        );
    }
}