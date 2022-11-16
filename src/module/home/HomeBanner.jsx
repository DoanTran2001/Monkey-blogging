import Button from "components/button/Button";
import React from "react";
import styled from "styled-components";

const HomeBannerStyled = styled.div`
  height: 500px;
  padding: 40px 0;
  background-image: linear-gradient(
    to right bottom,
    ${(props) => props.theme.primary},
    ${(props) => props.theme.secondary}
  );

  .banner {
    display: flex;
    justify-content: center;
    align-items: center;
    &__content {
      max-width: 600px;
      color: white;
    }
    &__heading {
      font-size: 36px;
      margin-bottom: 20px;
    }
    &__desc {
      line-height: 1.5;
      margin-bottom: 40px;
    }
  }
`;
const Buttonbanner = styled(Button)`
  background: #fff;
  color: ${props => props.theme.primary};
  padding: 15px 20px;
  height: auto;

`
export default function HomeBanner() {
  return (
    <HomeBannerStyled>
      <div className="container">
        <div className="banner">
          <div className="banner__content">
            <h1 className="banner__heading">Monkey Blogging</h1>
            <p className="banner__desc">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea
              impedit eius dolore, ipsa libero quas tempora dolorum pariatur
              consectetur placeat cupiditate ut, quisquam hic perspiciatis nemo?
              Necessitatibus facere aliquid aut?
            </p>
            <Buttonbanner to="/sign-up" type="submit" kind="secondary">Get started</Buttonbanner>
          </div>
          <div className="banner__image">
            <img src="/img-banner.png" alt="" />
          </div>
        </div>
      </div>
    </HomeBannerStyled>
  );
}
