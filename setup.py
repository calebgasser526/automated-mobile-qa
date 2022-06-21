import setuptools

with open("README.md", "r", encoding="utf-8") as fh:
    long_description = fh.read()

setuptools.setup(
    name="mtest",
    version="0.0.1",
    author="Caleb Gasser",
    author_email="cgasser@evolytics.com",
    description="For automation of testing mobile applications.",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.move.com/InnerOpenSource/appiumpoc",
    project_urls={
        "Bug Tracker": "https://github.move.com/InnerOpenSource/appiumpoc/issues",
    },
    classifiers=[
        "Programming Language :: Python :: 3",
        "Operating System :: OS Independent",
    ],
    package_dir={"": "mtest"},
    packages=setuptools.find_packages(where="src"),
    python_requires=">=3.8",
)
