import Map, { Marker, MarkerProps } from 'react-map-gl/mapbox';

const DefaultMarker: React.FC<{ children: React.ReactNode, props: MarkerProps }> = ({ children, props }) => {

    return (
        <Marker
            style={{
                position: "absolute",
                top: 0,
                left: 0,
            }}
            {...props}
        >
            {children}
        </Marker>
    );
};

export default DefaultMarker;