import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { AiOutlineUserAdd, AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { GrAchievement, GrTrophy } from 'react-icons/gr';
import { FaMedal, FaPen } from 'react-icons/fa';
import { BiMedal, BiCog, BiCheck } from 'react-icons/bi';
import { RiImageEditLine } from 'react-icons/ri';
import { IoClose } from 'react-icons/io5';
import { MdCheck } from 'react-icons/md';

import Loader from 'src/components/Loader';

import Follows from './Follows';
import Explorations from './Explorations';

export default function Profile({
  firstName,
  lastName,
  username,
  avatarUrl,
  menuValue,
  changeMenuValue,
  profileId,
  loggedUserId,
  getInfo,
  followers,
  following,
  explorations,
  handleFollow,
  handleUnfollow,
  userFollowed,
  handleToggleBioEdit,
  bioEditIsOpen,
  biography,
  biographyEdit,
  changeField,
  handleBioEdit,
  userFound,
}) {
  const handleToggleNav = (event) => {
    changeMenuValue(event.target.dataset.toggle);
  };

  const handleChange = (event) => {
    changeField(event.target.value, event.target.name);
  };

  const handleBioEditSubmit = (event) => {
    event.preventDefault();
    handleBioEdit();
    handleToggleBioEdit();
  };

  const handleAvatarEdit = () => {
    console.log('JE CHANGE MON AVATAR STP');
  };

  useEffect(() => {
    getInfo(profileId);
  }, [profileId]);

  if (!loggedUserId || !explorations || !profileId) {
    return <Loader />;
  }

  if (!userFound) {
    return <h1 className="main-title" style={{ height: '80vh' }}>Utilisateur introuvable</h1>;
  }

  return (
    <div className="profile">
      <div className="profile__header">

        <div className="profile__header__avatar">
          {(profileId === loggedUserId)
              && (
                <form className="profile__header__avatar__edit">
                  <label htmlFor="upload-avatar">
                    <RiImageEditLine className="profile__header__avatar__edit__icon" />
                    <input type="file" name="avatar" id="upload-avatar" accept="image/png, image/jpeg, image/jpg, image/gif, image/webp" onChange={handleAvatarEdit} />
                  </label>
                </form>
              )}
          <img src={avatarUrl} alt="Avatar de l'utilisateur" />
        </div>

        <div className="profile__header__description">
          <div className="profile__header__description__top">
            <div className="profile__header__description__top__left">
              <h3 className="profile__header__description__top__left__name">{firstName} {lastName}</h3>
              <h2 className="profile__header__description__top__left__username">{username}</h2>
              <div className="profile__header__description__top__left__stars" title="4 stars out of 5!">
                <AiFillStar /><AiFillStar /><AiFillStar /><AiFillStar /><AiOutlineStar />
              </div>
            </div>
            <div className="profile__header__description__top__right">
              {(profileId === loggedUserId)
                ? (
                  <Link to="/settings">
                    <BiCog className="profile__header__description__top__right__cog" />
                  </Link>
                ) : (
                  <>
                    <button
                      type="button"
                      className={userFollowed ? 'profile__follows__button button --secondary' : 'profile__follows__button--active button --secondary'}
                      onClick={() => {
                        handleFollow(profileId);
                      }}
                    >
                      <span className="icon is-small">
                        <AiOutlineUserAdd />
                      </span>
                      <span>Suivre</span>
                    </button>

                    <button
                      type="button"
                      className={userFollowed ? 'profile__follows__button--active button --outlined' : 'profile__follows__button button --outlined'}
                      onClick={() => {
                        handleUnfollow(profileId);
                      }}
                    >
                      <span className="icon is-small">
                        <BiCheck />
                      </span>
                      <span>Suivi(e)</span>
                    </button>
                  </>
                )}
            </div>
          </div>
          <div className="profile__header__description__bio">
            <div className="profile__header__description__bio__explo">
              <BiMedal className="profile__header__description__bio__explo__medal" />
              <span>25 explorations</span>
            </div>
            {(profileId === loggedUserId && !bioEditIsOpen)
              && (
                <FaPen
                  className="profile__header__description__bio__edit"
                  onClick={() => {
                    handleToggleBioEdit();
                  }}
                />
              )}
            {bioEditIsOpen
              ? (
                <form
                  className="profile__header__description__bio__form"
                  onSubmit={handleBioEditSubmit}
                >
                  <textarea name="biographyEdit" onChange={handleChange} value={biographyEdit} />
                  <div className="profile__header__description__bio__form__buttons">
                    <button type="button" className="button --secondary" onClick={handleToggleBioEdit}>
                      <span className="icon"><IoClose /></span>
                    </button>
                    <button type="submit" className="button --secondary">
                      <span className="icon"><MdCheck /></span>
                    </button>
                  </div>
                </form>
              )
              : (
                <p className="profile__header__description__bio__paragraph">
                  {biography}
                </p>
              )}
            <div className="profile__header__description__bio__achievements">
              <FaMedal /> <GrAchievement /> <BiMedal /> <GrTrophy />
            </div>
          </div>
        </div>

      </div>

      <ul className="profile__nav">
        <li className={(menuValue === 1) ? 'profile__nav__elem profile__nav__elem--active' : 'profile__nav__elem'} data-toggle="1" onClick={handleToggleNav}>Informations</li>
        <li className={(menuValue === 2) ? 'profile__nav__elem profile__nav__elem--active' : 'profile__nav__elem'} data-toggle="2" onClick={handleToggleNav}>Suivi par</li>
        <li className={(menuValue === 3) ? 'profile__nav__elem profile__nav__elem--active' : 'profile__nav__elem'} data-toggle="3" onClick={handleToggleNav}>Suit</li>
      </ul>

      <div className="profile__content">
        {
          (() => {
            switch (menuValue) {
              case 1: return <> <h2 className="profile__content__title">Dernières explorations</h2> <Explorations explorations={explorations} /> </>;
              case 2: return <> <h2 className="profile__content__title">Les personnes qui le suivent</h2> <Follows users={followers} /> </>;
              case 3: return <> <h2 className="profile__content__title">Les personnes qu'il suit</h2> <Follows users={following} /> </>;
              default: return <h2 className="profile__content__title">Une erreur est survenue</h2>;
            }
          })()
        }
      </div>

    </div>
  );
}

Profile.propTypes = {
  getInfo: PropTypes.func.isRequired,
  loggedUserId: PropTypes.number.isRequired,
  profileId: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  menuValue: PropTypes.number.isRequired,
  changeMenuValue: PropTypes.func.isRequired,
  followers: PropTypes.array.isRequired,
  following: PropTypes.array.isRequired,
  explorations: PropTypes.array.isRequired,
  handleFollow: PropTypes.func.isRequired,
  handleUnfollow: PropTypes.func.isRequired,
  userFollowed: PropTypes.bool.isRequired,
  handleToggleBioEdit: PropTypes.func.isRequired,
  bioEditIsOpen: PropTypes.bool.isRequired,
  biography: PropTypes.string.isRequired,
  biographyEdit: PropTypes.string.isRequired,
  changeField: PropTypes.func.isRequired,
  handleBioEdit: PropTypes.func.isRequired,
  userFound: PropTypes.bool.isRequired,
};
