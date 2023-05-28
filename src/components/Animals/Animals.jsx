import {
  Typography,
  Card,
  CardActionArea,
  Paper,
  CardMedia,
} from "@mui/material";

export const Animals = ({ animals }) => {
  return (
    <div>
      {animals.map((animals) => {
        return (
          <div className="p-12">
            <Card className="flex shadow" sx={{ height: 350 }}>
              <CardActionArea className="flex flex-col">
                <CardMedia
                  component="img"
                  src={`http://miomi.by:9000${animals.photos[0]}`}
                  alt={animals.name}
                />
                <Paper
                  sx={{
                    position: "absolute",
                    top: 8,
                    left: 8,
                    height: 40,
                    width: 150,
                    borderRadius: "10px 10px 10px 10px",
                    bgcolor: "#CCE8E4",
                    p: 1,
                  }}
                >
                  <Typography className="pl-6">{animals.name}</Typography>
                </Paper>
                <div className="w-full px-16 pt-16"></div>
              </CardActionArea>
            </Card>
          </div>
        );
      })}
    </div>
  );
};
