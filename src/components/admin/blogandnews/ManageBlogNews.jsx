import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Fab,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import api from "../../../api/CallAPI";
import EditBlogNews from "./EditBlogNews";
import CreateBlogNews from "./CreateBlogNews";
import AdminSideMenu from "../components/AdminSideMenu";
import UserToast from "../../user/alert/UserToast";
import { ToastContainer } from "react-toastify";

export default function ManageBlogNews() {
  const [posts, setPosts] = useState([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const data = await api.get("BlogNews");
      if (data.success) {
        setPosts(data.blogNews);
      } else {
        console.log("No posts found!");
      }
    } catch (error) {
      UserToast("error", "An error occurred while fetching posts. Please try again.");
    }
  };

  // Open delete confirmation dialog
  const openDeleteDialog = (postId) => {
    setSelectedPostId(postId);
    setIsDeleteDialogOpen(true);
  };

  // Close delete dialog
  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setSelectedPostId(null);
  };

  // Confirm delete post
  const confirmDeletePost = async () => {
    try {
      const data = await api.del(`BlogNews/${selectedPostId}`);
      if (data.success) {
        UserToast("success", "Post deleted successfully!");
        setPosts((prevPosts) =>
          prevPosts.filter((post) => post.postId !== selectedPostId)
        );
      } else {
        UserToast("error", "Failed to delete post!");
      }
    } catch (error) {
      console.error("Error during deletion:", error);
      UserToast("error", "An error occurred during deletion. Please try again.");
    }
    closeDeleteDialog();
  };

  // Open edit dialog
  const openEditDialog = (postId) => {
    setSelectedPostId(postId);
    setIsEditDialogOpen(true);
  };

  // Close edit dialog
  const closeEditDialog = () => {
    setIsEditDialogOpen(false);
    setSelectedPostId(null);
  };

  // Open add dialog
  const openAddDialog = () => {
    setIsAddDialogOpen(true);
  };

  // Close add dialog
  const closeAddDialog = () => {
    setIsAddDialogOpen(false);
  };

  return (
    <Box display="flex">
      <ToastContainer />
      <AdminSideMenu />
      <Box flex={1} padding={3}>
        <Typography variant="h5" gutterBottom fontWeight="bold">
          Blog and News Management
        </Typography>

        <TableContainer component={Paper}>
          <Table aria-label="blog and news table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography fontWeight={600} align="center">
                    PostId
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight={600} align="center">
                    UserId
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight={600} align="center">
                    Title
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight={600} align="center">
                    Subtitle
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight={600} align="center">
                    Thumbnail
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight={600} align="center">
                    Content
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight={600} align="center">
                    PostDate
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight={600} align="center">
                    Category
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight={600} align="center">
                    Actions
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {posts.map((post) => (
                <TableRow key={post.postId}>
                  <TableCell align="center">{post.postId}</TableCell>
                  <TableCell align="center">{post.userId}</TableCell>
                  <TableCell align="center">{post.title}</TableCell>
                  <TableCell align="center">{post.subtitle}</TableCell>
                  <TableCell align="center">{post.thumbnail}</TableCell>
                  <TableCell>{post.content}</TableCell>
                  <TableCell align="center">{post.postDate}</TableCell>
                  <TableCell align="center">{post.category}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => openDeleteDialog(post.postId)}
                      sx={{ marginRight: 1 }}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => openEditDialog(post.postId)}
                    >
                      Update
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Floating Action Button for Adding Blog/News */}
        <Fab
          color="primary"
          aria-label="add"
          sx={{ position: "fixed", bottom: 16, right: 16 }}
          onClick={openAddDialog}
        >
          <AddIcon />
        </Fab>

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={isDeleteDialogOpen}
          onClose={closeDeleteDialog}
          aria-labelledby="delete-dialog-title"
          aria-describedby="delete-dialog-description"
        >
          <DialogTitle id="delete-dialog-title">Confirm Deletion</DialogTitle>
          <DialogContent>
            <DialogContentText id="delete-dialog-description">
              Are you sure you want to delete this post?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={confirmDeletePost} color="error">
              Yes
            </Button>
            <Button onClick={closeDeleteDialog} color="primary" autoFocus>
              No
            </Button>
          </DialogActions>
        </Dialog>

        {/* Add Blog/News Dialog */}
        <Dialog
          open={isAddDialogOpen}
          onClose={closeAddDialog}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>Add New Blog/News</DialogTitle>
          <DialogContent>
            <CreateBlogNews
              onClose={closeAddDialog}
              onAddSuccess={fetchPosts}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={closeAddDialog} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>

        {/* Edit Blog/News Dialog */}
        <Dialog
          open={isEditDialogOpen}
          onClose={closeEditDialog}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>Edit Blog/News</DialogTitle>
          <DialogContent>
            <EditBlogNews
              postId={selectedPostId}
              onClose={closeEditDialog}
              onUpdateSuccess={fetchPosts}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={closeEditDialog} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}
