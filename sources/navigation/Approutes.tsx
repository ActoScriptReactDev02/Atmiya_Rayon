import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Partynavigtion from './Approutes/Partynavigtion'
import TeamMembernavigtion from './Approutes/TeamMembernavigtion'
import Drivernavigtion from './Approutes/Drivernavigtion'

const Approutes = ({type}) => {
  return (
     type == 'Team Member' ?<TeamMembernavigtion/> : type == 'Driver' ? <Drivernavigtion/> : <Partynavigtion/>
  )
}

export default Approutes

const styles = StyleSheet.create({})