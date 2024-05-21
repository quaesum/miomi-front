import { Modal, Box, Typography, Table, TableHead, TableContainer, TableCell, TableRow,TableBody, Button } from "@mui/material"

export const ModalParticipatiors = ({users, openModal, handleCloseModal}) => {
    return (
        <Modal
            open={openModal}
            onClose={handleCloseModal}
            aria-labelledby="participants-modal"
            aria-describedby="modal to view participants"
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <Typography variant="h6" id="modal-title" gutterBottom>
                    Участники
                </Typography>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Фамилия</TableCell>
                                <TableCell>Имя</TableCell>
                                <TableCell>Роль</TableCell>
                                <TableCell>Номер телефона</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users && users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.lastName}</TableCell>
                                    <TableCell>{user.firstName}</TableCell>
                                    <TableCell>{user.role}</TableCell>
                                    <TableCell>{user.phone}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>

                    </Table>
                </TableContainer>
                <Button sx={{ paddingTop: "12px" }} onClick={handleCloseModal}>Закрыть</Button>
            </Box>
        </Modal>
    )
}