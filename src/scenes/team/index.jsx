import { Box, TextField, Typography, useTheme, Button, Grid, Divider, Snackbar } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { makeStyles } from '@mui/styles';
import { useState, useEffect } from "react";
import { mockDataTeams } from "../../data/mockTeams";
import ButtonWrapper from "../../components/FormsUI/Button";
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import TextfieldWrapper from "../../components/FormsUI/Textfield";
import { Form, Formik } from "formik";
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { UserAuth } from "../../components/Context/AuthContext";
import LoadingScreen from "../loadingScreen";
import { auth, db } from "../../components/firebaseConfig";
import { doc, getDocs, where, query, collection, onSnapshot, serverTimestamp, setDoc } from "firebase/firestore";
import DeleteIcon from '@mui/icons-material/Delete';


const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { userData } = UserAuth()

  const teamInitValues = {
    teamId: uuidv4(),
    teamName: "",
    walletAddress: "",
    members: []
  };

  const teamValidationForm = Yup.object().shape({
    teamName: Yup.string()
      .required("Required"),
    teamMultiWallet: Yup.string()
      .required("Required"),
  });

  const memberInitValues = {
    id: 0,
    name: "",
    lastName: "",
    memberEmail: ""
  };

  const memberValidationForm = Yup.object().shape({
    name: Yup.string()
      .required("Required"),
    lastName: Yup.string()
      .required("Required"),
    email: Yup.string().email().required("email is required"),
  });

  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true)


  const handleAddTeam = () => {
    var size = teams.length + 1
    const defTeam =
    {
      authorId: auth.currentUser.uid,
      teamId: uuidv4(),
      changeDate: serverTimestamp(),
      formationDate: serverTimestamp(),
      teamName: 'My Team ' + size,
      teamMultiWallet: '',
      members: [
        {
          memberId: 1,
          name: userData.name,
          lastName: userData.lastName,
          email: userData.email,
          likes: userData.likes,
          dislikes: userData.dislikes,
          mainPlatform: userData.mainPlatform,
          countCompletedProjects: userData.countCompletedProjects,
          aboutMe: userData.aboutMe
        },
      ]
    }
    console.log("team member" + defTeam.members[0])
    const values = [...teams, defTeam]
    setTeams(values)
  }
  const handleSaveTeamValues = () => {

  }

  const checkUserExistance = async (userValue) => {

  }

  useEffect(() => {

    const teamsColRef = query(collection(db, 'teams'), where("authorId", '==', auth.currentUser.uid))
    const unsubscribe = onSnapshot(teamsColRef, (querySnapshot) => {
      const teamsData = [];
      querySnapshot.forEach((doc) => {
        teamsData.push(
          doc.data()
        )
        console.log('teams data', teamsData)
      });
      console.log(teamsData)
      setTeams(teamsData)
      setLoading(false)
    })
    return () => {
      unsubscribe();
    };
  }, [])

  const handleAddTeammate = (members, i) => {
    let updateTeam = [...teams]
    var memSize = members.length + 1
    var newMember = {
      memberId: memSize,
      name: '',
      lastName: '',
      email: ''
    }
    updateTeam[i].members = [...updateTeam[i].members, newMember]
    setTeams(updateTeam)
  }

  const handleSaveTeammateValues = () => {

  }
  return (
    <>
      {loading ? (<LoadingScreen />) : (
        <Box m="20px" >
          <Header title="Your Teams" subtitle="Managing the Team Members" />
          <Box

            m="40px 0 0 0"
            height="75vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .name-column--cell": {
                color: colors.greenAccent[300],
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: colors.blueAccent[700],
                borderBottom: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: colors.primary[400],
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
                backgroundColor: colors.blueAccent[700],
              },
              "& .MuiCheckbox-root": {
                color: `${colors.greenAccent[200]} !important`,
              },
            }}
          >
            <Button
              width="200px"
              color="secondary"
              variant='contained'
              onClick={() => handleAddTeam()}> Add Team</Button>
            {teams.map((item, i) => {

              return (
                <Box key={item.teamId}>
                  <Formik
                    initialValues={item}
                    validationSchema={teamValidationForm}
                    onSubmit={async (values) => {
                      console.log("save team")
                      try {
                        const updateTeam = [...teams]
                        var teamNames = teams.map((t) => {
                          return t.teamName
                        })
                        teamNames = teamNames.filter(item => item !== teams[i].teamName)
                        console.log("team names: " + teamNames)
                        teams[i] = values
                        if (!teamNames.includes(teams[i].teamName) ) {
                          const confirmTeamChanges = {
                            authorId: teams[i].authorId,
                            changeDate: serverTimestamp(),
                            formationDate: teams[i].formationDate,
                            members: teams[i].members,
                            teamId: teams[i].teamId,
                            teamMultiWallet: values.teamMultiWallet,
                            teamName: values.teamName
                          }
                          updateTeam[i] = confirmTeamChanges
                          setTeams(updateTeam)
                          const colRef = collection(db, 'teams')
                          console.log("team id:" + updateTeam[i].teamId)
                          const teamRef = doc(colRef, updateTeam[i].teamId)
                          await setDoc(teamRef, updateTeam[i])
                          console.log('completed')
                        } else {

                        }
                      } catch (e) {
                        console.log(e.message)
                      }
                    }}>
                    {props => (
                      <Form>
                        <Box mt={2} mb={2} p={1} display='block' sx={{ borderRadius: '16px', border: '1px solid black' }} justifyContent="start" alignItems="center" style={{ backgroundColor: colors.primary[400] }}>
                          <Box p={1} >
                            <Grid container spacing={6} align="center" justify="center" alignItems="center">
                              <Grid item xs={4}>
                                <TextfieldWrapper
                                  name="teamName"
                                  label="Input team name"
                                  color="secondary"
                                  value={props.values.teamName}
                                  onChange={(e) => {
                                    props.setFieldValue("teamName", e.target.value)
                                  }}>

                                </TextfieldWrapper>
                              </Grid>
                              <Grid item xs={4}>
                                <TextfieldWrapper
                                  name="teamMultiWallet"
                                  label="Input multisig address of the team"
                                  color="secondary"
                                  value={props.values.teamMultiWallet}
                                  onChange={(e) => {
                                    props.setFieldValue("teamMultiWallet", e.target.value)
                                  }}>

                                </TextfieldWrapper>
                              </Grid>
                              <Grid item xs={4}>
                                <Grid container spacing={2} align="center" justify="center" alignItems='center'>
                                  <Grid item xs={3}>

                                  </Grid>
                                  <Grid item xs={4}>
                                    <ButtonWrapper
                                      color="primary"
                                      endIcon={<CheckIcon color="secondary" />}
                                    >
                                      Save values

                                    </ButtonWrapper>
                                  </Grid>
                                  <Grid item xs={5}>
                                    <Button
                                      variant="outlined"
                                      color="third"
                                      endIcon={<AddIcon />}
                                      onClick={() => handleAddTeammate(item.members, i)}
                                    >
                                      Add teammate
                                    </Button>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Box>
                        </Box>
                      </Form>
                    )}
                  </Formik>
                  <Box mb={2} p={1} sx={{ borderRadius: '16px', border: '1px solid black' }} justifyContent="start" alignItems="center" style={{ backgroundColor: colors.primary[400] }}>
                    <Box p={1}>
                      <Grid display='flex' justifyContent='space-around' alignItems="center">
                        <Grid item xs={3}>
                          <Typography align="right">
                            Teammate first name
                          </Typography>
                        </ Grid>
                        <Grid item xs={3}>
                          <Typography align="right">
                            Teammate last name
                          </Typography>
                        </Grid>

                        <Grid item xs={3}>
                          <Typography align="right">
                            Teammate email
                          </Typography>
                        </Grid>
                        <Grid item xs={3}>

                        </Grid>
                      </Grid>
                    </Box>

                    <>
                      {item.members.map((member, it) => {
                        return (
                          <Box key={member.memberId}>
                            <Formik

                              initialValues={member}
                              validationSchema={memberValidationForm}
                              onSubmit={async (values) => {
                                console.log("save user")
                                try {
                                  console.log("email: " + values.email)
                                  const q = query(collection(db, "users"), where("email", "==", values.email));
                                  const userData = []
                                  await getDocs(q)
                                    .then((querySnapshot) => {
                                      querySnapshot.forEach((doc) => {
                                        userData.push(doc.data());
                                      });
                                      if (userData.length > 0) {
                                        console.log("функция работает")
                                        const currentMember = userData[0]
                                        console.log("save user")
                                        const updateTeammates = [...teams]
                                        const memberSize = it + 1
                                        const confirmMemberSave = {
                                          memberId: memberSize,
                                          name: values.name,
                                          lastName: values.lastName,
                                          email: values.email,
                                          likes: currentMember.likes,
                                          dislikes: currentMember.dislikes,
                                          mainPlatform: currentMember.mainPlatform,
                                          countCompletedProjects: currentMember.countCompletedProjects,
                                          aboutMe: currentMember.aboutMe
                                        }
                                        updateTeammates[i].members[it] = confirmMemberSave
                                        console.log("save members")
                                        setTeams(updateTeammates)
                                        console.log("Значние сокомандника сохранено успешно")
                                      }
                                      else console.log("User not found")
                                    })
                                } catch (e) {
                                  console.log("Не удалось сохранить значение сокомандника")
                                }
                              }}>
                              {props => (
                                <Form onSubmit={props.handleSubmit}>
                                  <Box >
                                    <Box p={1} >
                                      <Grid container align="center" justify="center" alignItems="center">
                                        <Grid item xs={3}>
                                          <TextfieldWrapper
                                            fullWidth={true}
                                            name="name"
                                            label="Input teammate name"
                                            color="secondary"
                                            value={props.values.name}
                                            onChange={(e) => {
                                              props.setFieldValue("name", e.target.value)
                                            }}
                                          >
                                          </TextfieldWrapper>
                                        </Grid>
                                        <Grid item xs={3}>
                                          <TextfieldWrapper
                                            name="lastName"
                                            label="Input teammate last name"
                                            color="secondary"
                                            value={props.values.lastName}
                                            onChange={(e) => {
                                              props.setFieldValue("lastName", e.target.value)
                                            }}>
                                          </TextfieldWrapper>
                                        </Grid >
                                        <Grid item xs={4}>
                                          <TextfieldWrapper
                                            name="email"
                                            label="Input teammate email address"
                                            color="secondary"
                                            value={props.values.email}
                                            onChange={(e) => {
                                              props.setFieldValue("email", e.target.value)
                                            }}>
                                          </TextfieldWrapper>
                                        </Grid>
                                        <Grid item xs={2}>
                                          <Grid container spacing={1}>
                                            <Grid item xs={2}></Grid>
                                            <Grid item xs={6}>
                                              <ButtonWrapper
                                                color="primary"
                                                endIcon={<AddIcon color="secondary" />}
                                              >
                                                Save
                                              </ButtonWrapper>
                                            </Grid>
                                            <Grid item xs={4}>
                                              <Button
                                                variant="outlined"
                                                color="red"
                                                endIcon={<DeleteIcon fontSize="large" />}
                                              >
                                              </Button>
                                            </Grid>
                                          </Grid>
                                        </Grid>
                                      </Grid>
                                    </Box>
                                  </Box>
                                </Form>
                              )}
                            </Formik>
                          </Box>
                        )
                      })}
                    </>

                  </Box>
                  <Divider>{item.teamName}</Divider>
                </Box>
              )
            })}

          </Box>
        </Box>
      )}
    </>
  );
};

export default Team;
