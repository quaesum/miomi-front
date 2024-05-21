import {
    Button,
    Card,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    Typography,
    FormControlLabel
} from "@mui/material";
import { Checkbox } from "@mui/material";


export const WOShelter = ({
    setOpenModal, 
    openModal, 
    handleSubmit, 
    register, 
    handleCreateShelter, 
    useProfileData,
    setValue,
    setUseProfileData, 
    errors, 
    loading,
    data
}) => {

    const handleCheckboxChange = (event) => {
        setUseProfileData(event.target.checked);
        if (event.target.checked) {
          setValue("address", data.address);
          setValue("phone", data.phone);
        } else {
          setValue("address", "");
          setValue("phone", "");
        }
      };

    return (
        <>
            <Card
                sx={{
                    width: {
                        sm: "400px",
                        lg: "650px",
                        xs: "400px",
                        borderRadius: "20px",
                    },
                    height: "h-max",
                }}
                className="flex items-center flex-col space-y-12 justify-center py-12"
            >
                <Typography fontSize={24} className="text-center">
                    Вы не состоите в приюте или ваша заявка ещё не одобрена.
                </Typography>
                <Button onClick={() => setOpenModal(true)}>Оставить заявку</Button>
            </Card>

            <Dialog open={openModal} onClose={() => setOpenModal(false)}>
                <DialogTitle>Создание приюта</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Заполните данные для создания приюта:
                    </DialogContentText>
                    <form onSubmit={handleSubmit(handleCreateShelter)}>
                        <>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={useProfileData}
                                        onChange={handleCheckboxChange}
                                    />
                                }
                                label="Использовать данные из профиля"
                            />
                            <TextField
                                {...register("name", { required: true })}
                                label="Название"
                                id="shelter-name"
                                fullWidth
                                margin="normal"
                                error={!!errors.name}
                                helperText={errors.name ? "Введите название приюта" : ""}
                            />
                            <TextField
                                {...register("description", { required: true })}
                                label="Описание"
                                fullWidth
                                margin="normal"
                                error={!!errors.description}
                                helperText={errors.description ? "Введите описание приюта" : ""}
                            />
                            <TextField
                                {...register("address", { required: true })}
                                label="Адрес"
                                fullWidth
                                margin="normal"
                                error={!!errors.address}
                                helperText={errors.address ? "Введите адрес приюта" : ""}
                            />
                            <TextField
                                {...register("phone", { required: true })}
                                label="Телефон"
                                fullWidth
                                margin="normal"
                                error={!!errors.phone}
                                helperText={errors.phone ? "Введите телефон приюта" : ""}
                            />
                        </>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenModal(false)}>Отмена</Button>
                    <Button
                        onClick={handleSubmit(handleCreateShelter)}
                        disabled={loading}
                    >
                        {loading ? "Создание..." : "Создать"}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}