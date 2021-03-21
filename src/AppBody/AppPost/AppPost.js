import React, { useState } from 'react'
import './AppPostStyle.css'
import { Avatar, makeStyles } from '@material-ui/core'
import SamplePost from './static/SamplePostOr.jpg'
import AppPostComments from './AppPostComment/AppPostComments'


import Heart from './static/like.png'
import WhiteHeart from './static/whiteheart.png'
import HeartRed from './static/like_red.png'
import Share from './static/share.png'
import Comment from './static/comment.png'
import SmileyFace from './static/SmileyFace.png'
import { useDoubleTap } from 'use-double-tap'

var blankUsernameBackgroundColors = ['purple', 'red', 'green', 'orange']
var blankUsernameBackgroundColor = blankUsernameBackgroundColors[Math.floor(Math.random() * blankUsernameBackgroundColors.length)];

const usestyle = makeStyles((theme) => ({
    medium: {
        width: theme.spacing(4),
        height: theme.spacing(4),
        backgroundColor: blankUsernameBackgroundColor,
        fontSize: 13
    }
}));

export default function AppPost({ postUsername, postMediaURL, postTotalComments, postTotalLikes, postUploadedTimeStamp }) {

    const classes = usestyle();
    const [likes, setlikes] = useState(postTotalLikes);
    const [ILike, setILike] = useState(false)
    const [AnimeClass, setAnimeClass] = useState("")
    const [HeartPng, setHeartPng] = useState(Heart)
    const [PopUpHeartWhite, setPopUpHeartWhite] = useState("likePostWhiteHide")

    var LikesInformation = <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 5 }}>{likes} Likes</p>;

    function LikesStatusUpdater() {
        if (likes === 1) LikesInformation = <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 5 }}>{likes} Like</p>
        else if (likes > 1) LikesInformation = <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 5 }}>{likes} Likes</p>
        else LikesInformation = ""
    }


    const bind = useDoubleTap((event) => {
        LikeActionHandler()
    });

    function AddLike() {
        setlikes(preLikes => preLikes + 1);
        setILike(true)
        setAnimeClass("likePost")
        setHeartPng(HeartRed)
        setPopUpHeartWhite("likePostWhite")
        LikesStatusUpdater()
    }
    function DisLike() {
        setlikes(preLikes => preLikes - 1);
        setILike(false)
        setAnimeClass("")
        setHeartPng(Heart)
        setPopUpHeartWhite("likePostWhiteHide")
        LikesStatusUpdater()
    }

    function LikeActionHandler() {
        ILike ? DisLike() : AddLike()
    }

    // Likes status initiator 🧡
    LikesStatusUpdater()

    return (
        <div style={
            { marginBottom: 30 }
        }>
            <div className="container-fluid card">
                <div className="row">
                    <div className="container-fluid">
                        <div className="row card-top-info"
                            style={
                                { alignItems: 'center' }
                            }>
                            <div className="col-sm-12"
                                style={
                                    { marginLeft: 0 }
                                }>
                                <table>
                                    <tr>
                                        <td>
                                            <Avatar src="//" alt={postUsername}
                                                className={
                                                    classes.medium
                                                }></Avatar>
                                        </td>
                                        <td className="col-sm-6 card-top-name postUserName">
                                            {postUsername} </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12"
                                style={
                                    { padding: 0 }
                                }>

                                <img src={postMediaURL} {...bind}
                                    width="100%"
                                    alt="post" />
                                <div class="centered">
                                    <img src={WhiteHeart} className={PopUpHeartWhite} alt="whiteheart" width="100px" />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="container"
                                style={
                                    { marginLeft: 10 }
                                }>
                                <div className="row">
                                    <div className="col-sm-1"
                                        style={
                                            {
                                                padding: 10,
                                                width: 30
                                            }
                                        }>
                                        <img src={HeartPng}
                                            onClick={LikeActionHandler}
                                            className={AnimeClass}
                                            width="30px"
                                            alt="postlike_dislike"></img>

                                    </div>
                                    <div className="col-sm-1"
                                        style={
                                            {
                                                padding: 10,
                                                width: 30
                                            }
                                        }>
                                        <img src={Comment}
                                            width="25px"
                                            alt="comment" />
                                    </div>
                                    <div className="col-sm-1"
                                        style={
                                            {
                                                padding: 10,
                                                width: 10
                                            }
                                        }>
                                        <img src={Share}
                                            width="25px"
                                            alt="share" />
                                    </div>
                                </div>
                                <div className="row" style={{ paddingLeft: 10 }}>
                                    {LikesInformation}
                                </div>
                                <div className="row" style={{ paddingLeft: 10 }}>
                                    <p style={{ fontSize: 12, fontWeight: 500, color: 'gray', marginBottom: 5 }}>
                                        View all comments
                                    </p>
                                </div>
                                <div className="row" style={{ marginBottom: 20 }}>
                                    <AppPostComments name="vivek"></AppPostComments>
                                </div>
                                <div className="row" style={{ paddingLeft: 10 }}>
                                    <p style={{ fontSize: 11, fontWeight: 500, color: 'gray', }}>
                                        {postUploadedTimeStamp}
                                    </p>
                                </div>

                            </div>
                        </div>
                        {/* Post a comment */}
                        <div className="row addComment">
                            <div className="col-1">
                                <img src={SmileyFace} alt="smileyFace" width="40px" style={{ paddingTop: "10px" }}></img>
                            </div>
                            <div className="col-9" >
                                <input className="addCommentInput" placeholder="Add a comment..."></input>
                            </div>
                            <div className="col-2">
                                <button className="PostButton">
                                    Post
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
