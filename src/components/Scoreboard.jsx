import Modal from '@mui/joy/Modal';
import { ModalDialog } from '@mui/joy';
import Table from '@mui/joy/Table';
import Grid from '@mui/joy/Grid';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import { useEffect, useState } from 'react';


const Scoreboard = (props) => {
    const[scores,setScores] = useState();

    useEffect(() => {
    const board = props.board.map(score => {
        let key = crypto.randomUUID();
    // Hours calculation
    const hours = Math.floor(score.data().timer / 360000);

    // Minutes calculation
    const minutes = Math.floor((score.data().timer % 360000) / 6000);

    // Seconds calculation
    const seconds = Math.floor((score.data().timer % 6000) / 100);

    // Milliseconds calculation
    const milliseconds = score.data().timer % 100;
            return <tr key={key} >
                <td> {score.data().id} </td>
                <td>{minutes.toString().padStart(2, "0")+'m'}:
                    {seconds.toString().padStart(2, "0")+'s'}:
                    {milliseconds.toString().padStart(2, "0")+'ms'}
                </td>
            </tr>
        })
    setScores(board);
    }, [])
    return (
        <>
            <Modal open>
                <ModalDialog
                    color="info"
                    size="lg"
                    variant="soft"
                >
                    <Typography level='h4' className='start'>Scoreboard!</Typography>
                    <Grid container spacing={2} sx={{ flexGrow: 1 }}>
                        <Grid xs={12} sx={{ display: 'flex',flexDirection:'column', justifyContent:'center' }}>
                            <Table aria-label="table variants" variant='plain' color={'neutral'}>
                                <thead>
                                    <tr>
                                        <th style={{ width: '40%' }}>Nombre</th>
                                        <th>Tiempo</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {scores}
                                </tbody>
                            </Table>
                        </Grid>
                        <Grid xs={12} sx={{ display: 'flex', justifyContent:'center' }}>
                            <Button variant='solid' color='info' onClick={props.handleClick}>Play Again</Button>
                        </Grid>
                    </Grid>
                </ModalDialog>
            </Modal>
        </>
    )
}

export default Scoreboard