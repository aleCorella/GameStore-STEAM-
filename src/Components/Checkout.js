import React from 'react';
import '../LogoStyle.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';

export const checkout = () => {
  const validateCreditCard = () => {
    const cardNumberInput = document.getElementById('cardNumber');
    const cardNumber = cardNumberInput.value.replace(/\s/g, '');

    if (luhnCheck(cardNumber)) {
      alert('Tarjeta válida');
    } else {
      alert('Tarjeta no válida');
    }
  };

  const luhnCheck = (cardNumber) => {
    let sum = 0;
    let doubleUp = false;

    for (let i = cardNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cardNumber.charAt(i), 10);

      if (doubleUp) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
      doubleUp = !doubleUp;
    }

    return sum % 10 === 0;
  };

  return (
    <div className="container">
      <br />
      <aside className="col-sm-9 mx-auto">
        <article className="card">
          <div className="card-body p-5">
            <ul className="nav bg-light nav-pills rounded nav-fill mb-3" role="tablist">
              <li className="nav-item">
                <a className="nav-link active" data-toggle="pill" href="#nav-tab-card">
                  <i className="fa fa-credit-card"></i> Credit Card
                </a>
              </li>
            </ul>

            <div className="tab-content">
              <div className="tab-pane fade show active" id="nav-tab-card">
                <p className="alert alert-success">Some text success or error</p>
                <form role="form">
                  <div className="form-group ">
                    <label htmlFor="username">Full name (on the card)</label>
                    <input type="text" className="form-control" name="username" placeholder="" required="" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="cardNumber">Card number</label>
                    <div className="input-group">
                      <input type="text" className="form-control" id="cardNumber" name="cardNumber" placeholder="" />
                      <div className="input-group-append">
                        <span className="input-group-text text-muted">
                          <i className="fab fa-cc-visa"></i> <i className="fab fa-cc-amex"></i> <i className="fab fa-cc-mastercard"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-8">
                      <div className="form-group">
                        <label><span className="hidden-xs">Expiration</span> </label>
                        <div className="input-group">
                          <input type="number" className="form-control" placeholder="MM" name="" />
                          <input type="number" className="form-control" placeholder="YY" name="" />
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="form-group">
                        <label data-toggle="tooltip" title="" data-original-title="3 digits code on back side of the card">
                          CVV <i className="fa fa-question-circle"></i>
                        </label>
                        <input type="number" className="form-control" id="cvv" required="" />
                      </div>
                    </div>
                  </div>
                  <button className="subscribe btn btn-primary btn-block" type="button" onClick={validateCreditCard}>
                    Confirm
                  </button>
                </form>
              </div>
            </div>
          </div>
        </article>
      </aside>
    </div>
  );
};

