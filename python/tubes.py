# origami python 

# the unit cell is defined in a local
# cartesian coordinate system 

import numpy as np

x = np.array([1,0,0])
y = np.array([0,1,0])
z = np.array([0,0,1])

pi = np.pi

def rotate_x(vec, theta):
	# 3-vec and radians 
	v = np.array(vec)
	Rx = np.array([[1,0,0],
		[0,np.cos(theta),-np.sin(theta)],
		[0,np.sin(theta),np.cos(theta)]])
	return np.dot(Rx,v)

def rotate_y(vec,theta):
	v = np.array(vec)
	Ry = np.array([
		[np.cos(theta),0,np.sin(theta)],
		[0,1,0],
		[-np.sin(theta),0,np.cos(theta)]])
	return np.dot(Ry,v)

def rotate_z(vec,theta):
	v = np.array(vec)
	Rz = np.array([
		[np.cos(theta),-np.sin(theta),0],
		[np.sin(theta),np.cos(theta),0],
		[0,0,1]])
	return np.dot(Rz,v)

def rotate_rod(vec,axis,theta):
	#implement the rodrigues rotation rule 
	v = np.array(vec)
	# normalize the rotation axis 
	u = axis/sum(np.array(axis))
	return v*np.cos(theta) + np.sin(theta)*np.cross(u,v) + (1-np.cos(theta))*u*np.dot(u,v)

# test
print rotate_z(x,pi/2)
print rotate_rod(x,z,pi/2)

# build a unit cell using rotations given a certain static configuration 

# rotate the vectors in the local coordinate system appropriately
# define all of the local points in the pattern 
#calculate the length, arclength, and inner/outer radii of the unit cell 

# define the global structure in cylindrical coordinates 




