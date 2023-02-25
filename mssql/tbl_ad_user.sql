
IF OBJECT_ID('fn_seq_tbl_ad_user') IS NOT NULL DROP FUNCTION fn_seq_tbl_ad_user
IF OBJECT_ID('sp_tbl_ad_user') IS NOT NULL DROP PROCEDURE sp_tbl_ad_user
GO
CREATE FUNCTION fn_seq_tbl_ad_user()
  RETURNS INT
AS
BEGIN
  DECLARE @ID INT = 0
  SELECT @ID = ISNULL(MAX(Id_user),0)+1 FROM tbl_ad_user
  RETURN @ID
END
GO
CREATE PROCEDURE sp_tbl_ad_user
  @ACTION NVARCHAR(40) = NULL,
  @RAWPRM NVARCHAR(255) = NULL,
  @Id_user INT = NULL,
  @Id_user_type INT = NULL,
  @Id_location INT = NULL,
  @username NVARCHAR(20) = NULL,
  @password NVARCHAR(255) = NULL,
  @name NVARCHAR(50) = NULL,
  @date_mod DATETIME = NULL,
  @user_mod NVARCHAR(20) = NULL,
  @active INT = NULL
AS
SET NOCOUNT ON
  DECLARE @MSG NVARCHAR(MAX) = ''
  
  IF ISNULL(@ACTION,'') = 'S'
  BEGIN
    SELECT
    A.Id_user,
    A.Id_user_type,
    A.Id_location,
    A.username,
    A.password,
    A.name,
    A.date_mod,
    A.user_mod,
    A.active
    FROM tbl_ad_user A WHERE 1 = 1
    AND (COALESCE(@Id_user,A.Id_user) = A.Id_user OR @Id_user IS NULL)
    AND (COALESCE(@Id_user_type,A.Id_user_type) = A.Id_user_type OR @Id_user_type IS NULL)
    AND (COALESCE(@Id_location,A.Id_location) = A.Id_location OR @Id_location IS NULL)
    AND (COALESCE(@username,A.username) = A.username OR @username IS NULL)
    AND (COALESCE(@password,A.password) = A.password OR @password IS NULL)
    AND (COALESCE(@name,A.name) = A.name OR @name IS NULL)
    AND (COALESCE(@date_mod,A.date_mod) = A.date_mod OR @date_mod IS NULL)
    AND (COALESCE(@user_mod,A.user_mod) = A.user_mod OR @user_mod IS NULL)
    AND (COALESCE(@active,A.active) = A.active OR @active IS NULL)
  END
  IF ISNULL(@ACTION,'') = 'I'
  BEGIN 
    BEGIN TRY
    BEGIN TRAN
      SET IDENTITY_INSERT tbl_ad_user ON
      
      SET @Id_user = dbo.fn_seq_tbl_ad_user()
      INSERT INTO tbl_ad_user(
      Id_user,
      Id_user_type,
      Id_location,
      username,
      password,
      name,
      date_mod,
      user_mod,
      active
      )
      VALUES(
      @Id_user,
      @Id_user_type,
      @Id_location,
      @username,
      @password,
      @name,
      @date_mod,
      @user_mod,
      @active
      )
      
      DECLARE @IDENTITY INT = @@IDENTITY
      SELECT A.* FROM tbl_ad_user A 
      WHERE A.Id_user = @IDENTITY 
      SET IDENTITY_INSERT tbl_ad_user OFF
    COMMIT
    END TRY
    BEGIN CATCH
      ROLLBACK
      SET @MSG = ERROR_MESSAGE() + ' ERRLINE > ' + ERROR_LINE() + 'ERRNUMBER > ' + ERROR_NUMBER()
      RAISERROR(@MSG,18,0)
    END CATCH
  END
  
  IF ISNULL(@ACTION,'') = 'U'
  BEGIN
    UPDATE A SET
    A.Id_user_type = @Id_user_type,
    A.Id_location = @Id_location,
    A.username = @username,
    A.password = @password,
    A.name = @name,
    A.date_mod = @date_mod,
    A.user_mod = @user_mod,
    A.active = @active
    FROM tbl_ad_user A
    WHERE A.Id_user = @Id_user
    
    SELECT A.* FROM tbl_ad_user A 
    WHERE A.Id_user = @Id_user
  END
  
  IF ISNULL(@ACTION,'') = 'D'
  BEGIN
    DELETE
    FROM tbl_ad_user
    WHERE Id_user = @Id_user
    
    SELECT @Id_user Id_user
  END
  
SET NOCOUNT OFF
