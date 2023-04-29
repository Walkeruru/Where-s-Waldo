import Modal from '@mui/joy/Modal';
import { ModalDialog } from '@mui/joy';
import Container from '@mui/joy/Container'
import Grid from '@mui/joy/Grid';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import FormControl from '@mui/joy/FormControl';
import Input from '@mui/joy/Input';
import '../App.css'

const StartScreen = (props) => {
    return (
        <div>
            <Modal open sx={{backgroundImage:'url(/whereswaldo.webp)'}}>
                <ModalDialog
                    size="lg"
                    variant="soft"
                    color="info"
                >
                    <Container>
                        <Typography level='h1' className='start' color={'info'} sx={{textAlign:'center'}}>Where's Waldo!</Typography>
                        <Grid container spacing={2} sx={{ flexGrow: 1 }}>
                            <Grid xs={12}>
                                <Typography level='body1' color={'info'} sx={{textAlign:'center'}}>a simple Where's Waldo game, where you need to find this 3 characters:</Typography>
                            </Grid>
                            <Grid xs={4}>
                                <Card>
                                    <CardCover>
                                        <img
                                            src="/waldo.webp"
                                            loading="lazy"
                                            alt=""
                                        />
                                    </CardCover>
                                    <CardContent>
                                        <Typography
                                            level="h6"
                                            fontWeight="lg"
                                            textColor="#000000"
                                            mt={{ xs: 12, sm: 18 }}
                                        >
                                            Waldo
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid xs={4}>
                                <Card>
                                    <CardCover>
                                        <img
                                            src="/Sokka.webp"
                                            loading="lazy"
                                            alt=""
                                        />
                                    </CardCover>
                                    <CardContent>
                                        <Typography
                                            level="h6"
                                            fontWeight="lg"
                                            textColor="#fff"
                                            mt={{ xs: 12, sm: 18 }}
                                        >
                                            Sokka
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid xs={4}>
                                <Card>
                                    <CardCover>
                                        <img
                                            src="/robin.webp"
                                            loading="lazy"
                                            alt=""
                                        />
                                    </CardCover>
                                    <CardContent>
                                        <Typography
                                            level="h6"
                                            fontWeight="lg"
                                            textColor="#fff"
                                            mt={{ xs: 12, sm: 18 }}
                                        >
                                            Robin
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid xs={12}>
                                    <FormControl sx={{ display: 'flex',flexDirection:'row', gap:'0.5em', justifyContent:'center'}}>
                                        <Input placeholder="name" onChange={props.handleChange} />
                                        <Button variant='solid' color='info' type='submit' onClick={props.startBtn}>Play</Button>
                                    </FormControl>
                            </Grid>
                        </Grid>
                    </Container>
                </ModalDialog>
            </Modal>
        </div>
    )
}

export default StartScreen