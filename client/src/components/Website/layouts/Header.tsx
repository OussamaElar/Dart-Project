
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Header = ()   => {
    return (
        <div className="header">
            <div className="container">
                <div className="row align-items-center justify-content-center">
                    <div className="col-md-6">
                        <img  className='header-logo' alt="header-logo" />
                    </div>
                    <div className="col-md-6">
                        <h3>
                        <FontAwesomeIcon icon="check-square" />                        
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;